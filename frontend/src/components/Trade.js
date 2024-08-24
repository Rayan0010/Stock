import React, { useState } from 'react';
import axios from 'axios';

const Trade = () => {
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState(0);

  const handleBuy = () => {
    axios.post('http://localhost:5000/api/trade', { symbol, shares, type: 'buy' })
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  };

  const handleSell = () => {
    axios.post('http://localhost:5000/api/trade', { symbol, shares, type: 'sell' })
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Trade Stocks</h2>
      <input type="text" value={symbol} onChange={e => setSymbol(e.target.value)} placeholder="Symbol" />
      <input type="number" value={shares} onChange={e => setShares(e.target.value)} placeholder="Shares" />
      <button onClick={handleBuy}>Buy</button>
      <button onClick={handleSell}>Sell</button>
    </div>
  );
};

export default Trade;
