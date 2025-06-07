import React, { useContext } from 'react';
//styles
import "./AppBody.css";
import Transactions from '../Transactions/Transactions';
import TopExpenses from '../TopExpenses/TopExpenses';
import { TransactionsContext } from '../../Contexts/AllContexts';

const AppBody = () => {
    const [transactionData] = useContext(TransactionsContext);
    
    return (
        <div className='AppBody'>
            <Transactions transactions={transactionData} />
            <TopExpenses transactions={transactionData} />
        </div>
    );
};

export default AppBody;