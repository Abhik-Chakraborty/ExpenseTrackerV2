import { useEffect, useState } from 'react'
//styles
import './App.css';
//components
import Navbar from './components/Navbar/Navbar'
import AppHead from './components/AppHead/AppHead'
import AppBody from './components/AppBody/AppBody';
//contexts
import { TransactionsContext, MoneyContext } from "./Contexts/AllContexts"
//variables
import { dummyData } from './dummyTransactions';

function App() {
  const [money, setMoney] = useState({
    balance: 5000,
    expenses: 0
  })
  const [transactionData, setTransactionData] = useState(dummyData);

  useEffect(() => {
    // Load data from local storage on initial render
    const localData = localStorage.getItem("expenses");
    if (localData) {
      const savedTransactions = JSON.parse(localData);
      setTransactionData(savedTransactions);
    } else {
      // If no data, initialize localStorage with default state
      localStorage.setItem("expenses", JSON.stringify(transactionData));
    }
  }, []);

  useEffect(() => {
    // Save data to local storage whenever transactionData changes
    localStorage.setItem("expenses", JSON.stringify(transactionData));
  }, [transactionData]);

  return (
    <main className='App'>
      <MoneyContext.Provider value={[money, setMoney]}>
        <TransactionsContext.Provider value={[transactionData, setTransactionData]}>
          <Navbar />
          <AppHead balance={money.balance} expenses={money.expenses}/>
          <AppBody />
        </TransactionsContext.Provider> 
      </MoneyContext.Provider>
    </main>
  )
}

export default App
