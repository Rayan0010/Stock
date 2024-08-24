const express = require('express');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// WebSocket server for real-time data
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ message: 'Welcome to the stock market simulator!' }));
  // Implement logic to send real-time stock data
});

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.get('/api/portfolio', async (req, res) => {
  try {
    // Placeholder for fetching portfolio data from MongoDB
    const portfolio = []; // Replace with actual data fetching
    res.json(portfolio);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/trade', async (req, res) => {
  const { symbol, shares, type } = req.body;
  try {
    // Placeholder logic for buying/selling stocks
    if (type === 'buy') {
      // Add stock to portfolio
    } else if (type === 'sell') {
      // Remove stock from portfolio
    }
    res.json({ message: `${type} successful` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production node server.js') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
