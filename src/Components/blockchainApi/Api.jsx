import React, { useEffect, useState } from 'react';
import styles from './Api.modules.css'

export default function Api() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
        let data;
      try {
        const response = await fetch('https://api.coincap.io/v2/assets/bitcoin/markets');
        const jsonData = await response.json();
        data=jsonData.data.sort((a,b)=>b.volumeUsd24Hr-a.volumeUsd24Hr)
        setCoins(data);
        
      } catch (error) {
        console.error('Error:', error.message);
      }
      console.log(data)
    };
    

    fetchCoins();
  }, []);

  return (
    <div className={styles.Api}>
      <h1>Top 100 Cryptocurrency Coins with max change</h1>
      <div className={styles.list}>
        <ul>
        {coins.map((coin,i) => (
          <li key={i*10}>
            <div className={styles.coins}><strong>{coin.exchangeId}</strong> ({coin.baseSymbol}): ${coin.priceUsd}</div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
