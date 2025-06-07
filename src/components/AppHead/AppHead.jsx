import React, { useContext } from 'react';
//styles
import "./AppHead.css"

//components
import Card from '../Card/Card';
import PieChartComp from '../PieChart/PieChart';
import Button from '../Button/Button';
//contexts
import { MoneyContext } from '../../Contexts/AllContexts';

const AppHead = props => {
    //props
    const { balance, expenses } = props;
    //contexts
    const [money, setMoney] = useContext(MoneyContext);

    const handleResetBalance = () => {
        if (window.confirm('Are you sure you want to reset your wallet balance to zero?')) {
            setMoney({
                ...money,
                balance: 0
            });
        }
    };

    return (
        <header className='AppHead'>
            <div className="wallet-section">
                <Card text="Wallet balance" value={balance}/>
                <Button 
                    text="Reset Balance"
                    background="backgroundRed"
                    buttonSize="mediumButton"
                    clickFunction={handleResetBalance}
                />
            </div>
            <Card text="Expenses" value={expenses}/>
            <PieChartComp />
        </header>
    );
};

export default AppHead;