import React, { useState } from 'react';
//styles
import "./Card.css"
//components
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

const Card = ({ text, value, type }) => {
    //states
    const [modalOn, setModalOn] = useState(false);
    //functions
    const toggleModal = () => setModalOn(!modalOn);

    const displayText = type === "balance" ? "Wallet Balance" : text;
    const displayValue = value;

    return (
        <div className='card'>
            <div className='cardText'>
                <span>{displayText}: </span> 
                <span className={text === "Expenses" ? "cardTextRed" : "cardTextGreen"}>
                    ₹{displayValue}
                </span>
            </div>
            <Button 
                text={text === "Expenses" ? "+ Add Expense" : "+ Add Income"}
                background={text === "Expenses" ? "gradientRed" : "gradientGreen"}
                buttonSize="largeButton"
                clickFunction={toggleModal}
            />
            {modalOn && (
                <Modal 
                    toggleModal={toggleModal} 
                    text={text === "Expenses" ? "Add Expense" : "Add Balance"}
                />
            )}
        </div>
    );
};

export default Card;