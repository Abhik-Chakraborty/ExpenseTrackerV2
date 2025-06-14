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
    balance: 3800,
    expenses: 1200
  })
  const [transactionData, setTransactionData] = useState(dummyData);

  useEffect(() => {
    // Load data from local storage on initial render
    const localData = localStorage.getItem("allData");
    if (localData) {
      const { money: savedMoney, transactionData: savedTransactions } = JSON.parse(localData);
      setMoney(savedMoney);
      setTransactionData(savedTransactions);
    }
  }, []);

  useEffect(() => {
    // Save data to local storage whenever money or transactionData changes
    localStorage.setItem("allData", JSON.stringify({ money, transactionData }));
  }, [money, transactionData]);

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
