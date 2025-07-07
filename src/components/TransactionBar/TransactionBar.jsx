import React, { useContext, useState } from 'react';
//styles
import "./TransactionBar.css"
//assets
import foodIcon from "../../assets/food.svg";
import movieIcon from "../../assets/movie.svg";
import travelIcon from "../../assets/travel.svg";
import deleteIcon from "../../assets/closeIcon.svg";
import editIcon from "../../assets/editIcon.svg";
//components
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { MoneyContext, TransactionsContext } from '../../Contexts/AllContexts';

const TransactionBar = ({ name, date, price, category, id }) => {
    //contexts
    const [money, setMoney] = useContext(MoneyContext);
    const [transactionData, setTransactionData] = useContext(TransactionsContext);
    //states
    const [modalOn, setModalOn] = useState(false);

    //functions
    const toggleModal = () => setModalOn(!modalOn);

    const selectIcon = () => {
        switch(category) {
            case "food": return foodIcon;
            case "entertainment": return movieIcon;
            case "travel": return travelIcon;
            case "income": return null;
            default: return foodIcon;
        }
    };

    const deleteTransaction = () => {
        let newBalance = money.balance;
        let newExpense = money.expenses;
        if (category === "income") {
            newBalance = money.balance - Number(price);
        } else {
            newBalance = money.balance + Number(price);
            newExpense = money.expenses - Number(price);
        }
        setTransactionData(prev => prev.filter(item => item.id !== id));
        setMoney({ balance: newBalance, expenses: newExpense });
    };

    return (
        <div className='TransactionBar'>
            <span className='transactionIcon'>
                {selectIcon() && <img src={selectIcon()} alt={category} />}
            </span>
            <span className='TransactionBarBody'>
                <span className='TransactionText'>
                    <span className='TransactionName'>{name}</span>
                    <span className='TransactionDate'>{date}</span>
                </span>
                <span className={`TransactionAmount ${category === "income" ? "cardTextGreen" : "cardTextRed"}`}>₹{price}</span>
            </span>
            {category !== "income" && (
                <>
                    <Button 
                        icon={deleteIcon} 
                        buttonSize="smallButton" 
                        background="backgroundRed" 
                        clickFunction={deleteTransaction}
                    />
                    <Button 
                        icon={editIcon} 
                        buttonSize="smallButton" 
                        background="backgroundOrange" 
                        clickFunction={toggleModal} 
                    />
                    {modalOn && (
                        <Modal 
                            toggleModal={toggleModal} 
                            text="Edit Expense"
                            existingData={{ name, date, price, category, id }}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default TransactionBar;