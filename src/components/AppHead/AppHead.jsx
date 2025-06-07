import React from 'react';
//styles
import "./AppHead.css"

//components
import Card from '../Card/Card';
import PieChartComp from '../PieChart/PieChart';

const AppHead = ({ balance, expenses }) => {
    return (
        <header className='AppHead'>
            <div className="cards-container">
                <Card text="Wallet balance" value={balance} type="balance"/>
                <Card text="Expenses" value={expenses} type="expenses"/>
            </div>
            <PieChartComp />
        </header>
    );
};

export default AppHead;