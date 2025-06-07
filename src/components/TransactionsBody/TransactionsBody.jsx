import React, { useContext, useEffect, useState } from 'react';
//styles
import "./TransactionsBody.css"
//components
import TransactionBar from '../TransactionBar/TransactionBar';
import PageNavigateBar from './PageNavigateBar';
//contexts
import { TransactionsContext } from '../../Contexts/AllContexts';

const TransactionsBody = () => {
    //contexts
    const [transactionData, setTransactionData] = useContext(TransactionsContext);
    //states
    const [pages, setPages] = useState({ currentPage: 1, totalPages: 1 });

    //everytime transactionData updates
    useEffect(() => {
        onLoad();
    }, [transactionData]);

    //functions
    const displayTransactions = () => {
        if (!transactionData || !transactionData.length) return null;

        const startIndex = 5 * (pages.currentPage - 1);
        const endIndex = Math.min(5 * pages.currentPage - 1, transactionData.length - 1);

        return transactionData
            .slice(startIndex, endIndex + 1)
            .map((transaction, index) => {
                const { title, date, price, category, id } = transaction;
                return (
                    <TransactionBar 
                        key={id || index}
                        name={title}
                        date={date}
                        amount={price}
                        category={category}
                        id={id}
                    />
                );
            });
    };

    const onLoad = () => {
        setPages({
            currentPage: 1,
            totalPages: Math.ceil((transactionData?.length || 0) / 5)
        });
    };
    
    const updatePage = direction => {
        const { currentPage, totalPages } = pages;
        if (direction === "right" && currentPage < totalPages) {
            setPages(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
        }
        if (direction === "left" && currentPage > 1) {
            setPages(prev => ({ ...prev, currentPage: prev.currentPage - 1 }));
        }
    };

    return (
        <div className='TransactionBody'>
            <div className='transactionBodyUpper'>
                <div className='transactionPage'>{displayTransactions()}</div>
            </div>
            <div className='transactionBodylower'>
                <PageNavigateBar key="pageNavigate" pages={pages} updatePage={updatePage} />
            </div>
        </div>
    );
};

export default TransactionsBody;