import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    // Fetch portfolio data from backend
    axios.get('http://localhost:5000/api/portfolio')
      .then(res => setPortfolio(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Your Portfolio</h2>
      <ul>
        {portfolio.map(stock => (
          <li key={stock._id}>{stock.symbol}: {stock.shares} shares</li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
