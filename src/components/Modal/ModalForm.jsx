import React, { useContext, useEffect, useState } from 'react';
//components
import FormButtons from '../FormButtons/FormButtons';
//contexts
import { MoneyContext, TransactionsContext } from '../../Contexts/AllContexts';
//style


const ModalForm = ({ toggleModal, formType, existingData }) => {
    //contexts
    const [money, setMoney] = useContext(MoneyContext);
    const [transactionData, setTransactionData] = useContext(TransactionsContext);
    
    //states
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        date: new Date().toISOString().split("T")[0],
        category: "",
    });
    const [balanceFormData, setBalanceFormData] = useState({ income: "" });

    //check for existing data to update transaction
    useEffect(() => {
        if (existingData) {
            const { title, date, price, category } = existingData;
            setFormData({
                title: title,
                price: price,
                date: date,
                category: category
            });
        }
    }, [existingData]);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        
        if (formType === "Add Balance") {
            setMoney(prev => ({
                ...prev,
                balance: prev.balance + Number(balanceFormData.income)
            }));
            // Add income as a transaction
            const newTransaction = {
                id: Date.now(),
                title: "Income",
                price: Number(balanceFormData.income),
                date: new Date().toISOString().split("T")[0],
                category: "income",
                type: "income"
            };
            setTransactionData(prev => [newTransaction, ...prev]);
            setBalanceFormData({ income: "" });
        } else if (formType === "Add Expense") {
            const newExpense = money.expenses + Number(formData.price);
            const newBalance = money.balance - Number(formData.price);

            if (newBalance < 0) {
                alert("Insufficient balance");
                return;
            }

            const newTransaction = {
                ...formData,
                id: Date.now(),
                price: Number(formData.price),
                type: "expense"
            };

            setMoney({ balance: newBalance, expenses: newExpense });
            setTransactionData(prev => [newTransaction, ...prev]);
            setFormData({
                title: "",
                price: "",
                date: new Date().toISOString().split("T")[0],
                category: "",
            });
        } else if (formType === "Edit Expense") {
            const newExpense = money.expenses + Number(formData.price) - Number(existingData.amount ?? existingData.price);
            const newBalance = money.balance - Number(formData.price) + Number(existingData.amount ?? existingData.price);

            if (newBalance < 0) {
                alert("Insufficient balance");
                return;
            }

            const updatedTransaction = {
                ...formData,
                id: existingData.id,
                price: Number(formData.price),
                type: "expense"
            };

            setMoney({ balance: newBalance, expenses: newExpense });
            setTransactionData(prev => 
                prev.map(transaction => 
                    transaction.id === existingData.id ? updatedTransaction : transaction
                )
            );
        }

        toggleModal();
    };

    const expenseAndEditInput = () => (
        <div className='formInputsDiv'>
            <input 
                required
                value={formData.title}
                className="formInput" 
                onChange={handleChange} 
                placeholder='Title' 
                type='text' 
                name='title'
                autoFocus
            />
            <input 
                required
                value={formData.price}
                className="formInput" 
                onChange={handleChange} 
                placeholder='Price' 
                type='number' 
                name='price'
            />
            <select
                required
                value={formData.category} 
                className="formInput" 
                onChange={handleChange} 
                name='category'
            >
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="entertainment">Entertainment</option>
                <option value="travel">Travel</option>
            </select>
            <input 
                required
                value={formData.date}
                className="formInput" 
                onChange={handleChange} 
                type='date' 
                name='date'
            />
        </div>
    );

    const incomeInputs = () => (
        <div className='balanceFormInputDiv'>
            <input 
                className="formInput" 
                onChange={e => setBalanceFormData({ income: e.target.value })} 
                placeholder='Income Amount' 
                type='number' 
                name='income' 
                value={balanceFormData.income}
                autoFocus
                required
            />
        </div>
    );

    return (
        <form className='modalForm expensesForm' onSubmit={handleSubmit}>
            {formType === "Add Balance" ? incomeInputs() : expenseAndEditInput()}
            <FormButtons text={formType} toggleModal={toggleModal} />
        </form>
    );
};

export default ModalForm;