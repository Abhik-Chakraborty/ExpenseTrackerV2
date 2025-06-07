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
        amount: "",
        date: new Date().toISOString().split("T")[0],
        category: "",
    });
    const [balanceFormData, setBalanceFormData] = useState({ income: "" });

    //check for existing data to update transaction
    useEffect(() => {
        if (existingData) {
            const { title, date, amount, category } = existingData;
            setFormData({
                title: title,
                amount: amount,
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
        } else if (formType === "Add Expense") {
            const newExpense = money.expenses + Number(formData.amount);
            const newBalance = money.balance - Number(formData.amount);

            if (newBalance < 0) {
                alert("Insufficient balance");
                return;
            }

            const newTransaction = {
                ...formData,
                id: Date.now(),
                type: "expense"
            };

            setMoney({ balance: newBalance, expenses: newExpense });
            setTransactionData(prev => [...prev, newTransaction]);
        } else if (formType === "Edit Expense") {
            const newExpense = money.expenses + Number(formData.amount) - Number(existingData.amount);
            const newBalance = money.balance - Number(formData.amount) + Number(existingData.amount);

            if (newBalance < 0) {
                alert("Insufficient balance");
                return;
            }

            const updatedTransaction = {
                ...formData,
                id: existingData.id,
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
                value={formData.amount}
                className="formInput" 
                onChange={handleChange} 
                placeholder='Amount' 
                type='number' 
                name='amount'
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