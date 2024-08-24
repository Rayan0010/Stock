import React, { useEffect, useState } from 'react';

function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [wsMessage, setWsMessage] = useState('');

  // Fetch portfolio data from the backend
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    fetchPortfolio();
  }, []);

  // WebSocket connection for real-time data
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setWsMessage(message.message);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>Stock Market Simulator</h1>
      <p>{wsMessage}</p>
      <h2>Portfolio</h2>
      <ul>
        {portfolio.map((item, index) => (
          <li key={index}>{item.symbol} - {item.shares} shares</li>
        ))}
      </ul>
    </div>
  );
}

export default App;


