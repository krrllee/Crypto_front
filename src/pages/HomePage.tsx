import React,{useState,useEffect,useRef} from "react";
import LogOut from "./LogOut";
import DataTable from 'react-data-table-component';
import HttpClient from "./HttpClient";
import './Table.css';
import './NavBar.css'
import './AddTransactionPage';
import { Bar } from "react-chartjs-2"
import { Chart, CategoryScale, LinearScale, Title, Tooltip, BarController, BarElement } from 'chart.js'; // Import the necessary components from chart.js

const HomePage:React.FC = ()=>{
    const [currencies, setCurrencies] = useState<Array<{name:string; symbol: string; price: number,price_change_percentage_24h:number }>>([]);
    const [isTableVisible, setTableVisible] = useState(false);
    const [transactions,setTransactions] = useState<Array<{id:number,name:string,type:string,amount:number,time_transacted:string,time_created:string,price_purchase_at:number}>>([]);
    const [summary, setSummary] = useState<any[]>([]);

    const handleDelete = async (id:number) => {
      try {
        const response = await fetch('//localhost:5000/delete_transaction', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
  
        if (response.ok) {
          const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
          setTransactions(updatedTransactions);
          window.location.href="/home"
        } else {
          console.error('Error deleting transaction.');
        }
      } catch (error) {
        console.error('An error occurred while deleting the transaction:', error);
      }
    };
    
    


    const handleLogout = () => {
      const token = localStorage.getItem('jwtToken')
      fetch('//localhost:5000/logout', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.status === 200) {
          
          localStorage.clear();
          window.location.href = '/login';

        } else {
          console.error('Logout failed');
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
    };
  
    
    useEffect(() => {
      async function fetchTransactions() {
        try {
          const token = localStorage.getItem('jwtToken')
          const config = {
             headers:{
              Authorization: `Bearer ${token}`,
             }
          }
          const response = await HttpClient.get('//localhost:5000/all_transactions',config);
          console.log(response.data)
          setTransactions(response.data.transactions);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      }

      const token = localStorage.getItem('jwtToken')
      HttpClient
      .get("//localhost:5000/transaction_summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSummary(response.data.summary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      
  
      fetch('//localhost:5000/cryptocurrencies')
        .then(response => response.json())
        .then(data => setCurrencies(data))
        .catch(error => console.error('Error fetching currencies:', error));

   
      fetchTransactions();

    }, []);


    
    return(
        <div className="App">
              <nav className="navbar">
        <a className="nav-brand" href="/home">
          Crypto Tracker
        </a>
        <ul className="nav-links">
          <li className="nav-link">
            <a href="/add"><button className="button-24" role="button">Add Transaction</button></a>
          </li>
          <li className="nav-link">
          <button className="button-24" role="button" onClick={handleLogout}>Log out</button>
          </li>
          <LogOut/>
        </ul>
      </nav>
      
      <div className="summary-container">
  <h1 className="summary-heading">Summary</h1>
  {summary.map((item) => (
    <div key={item.coin_name} className="summary-item">
      <h2 className="coin_name">Coin Name: {item.coin_name}</h2>
      <p>Total Amount: {item.total_amount}</p>
      <p>Total Value: {item.total_value}$</p>
    </div>
  ))}
</div>


      <div className="transaction-container">
      <div className="transaction-table-wrapper">
      <h2>Transaction History</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Time Transacted</th>
            <th>Time Created</th>
            <th>Price Purchased At</th>
            <th></th> 
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.name}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.time_transacted}</td>
              <td>{transaction.time_created}</td>
              <td>{transaction.price_purchase_at}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
        <div className={`crypto-container ${isTableVisible ? 'show-table' : ''}`}>
          <h1>Crypto Currencies from CoinMarketCap API</h1>
          <table className="crypto-table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{currency.name}</td>
                  <td>{currency.symbol}</td>
                  <td>
                    ${currency.price.toFixed(2)}{' '}
                    {currency.price_change_percentage_24h >= 0 ? (
                      <span className="up-arrow">▲</span>
                    ) : (
                      <span className="down-arrow">▼</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default HomePage