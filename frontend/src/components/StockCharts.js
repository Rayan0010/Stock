import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to backend

const StockChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    socket.on('stockData', data => {
      setChartData({
        labels: data.timestamps,
        datasets: [{
          label: 'Stock Price',
          data: data.prices,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        }]
      });
    });
  }, []);

  return (
    <div>
      <h2>Real-Time Stock Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default StockChart;
