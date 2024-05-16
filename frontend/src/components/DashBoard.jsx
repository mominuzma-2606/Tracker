import React, { useEffect, useState } from 'react';
import "../styles/Stock.css";
import axios from 'axios';

const StockData = ({ Ticker }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;

    const fetchStockQuote = async () => {
      try {
        const response = await axios.get('https://finnhub.io/api/v1/quote', {
          params: {
            symbol: Ticker,
            token: apiKey
          }
        });
        setData(response.data);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };

    if (Ticker) {
      fetchStockQuote();
    }
  }, [Ticker]); // Include Ticker in the dependency array

  if (!Ticker) {
    return <div align='center'>Please select a stock to see the data.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
    <h1 className="card-title">Stock Data for {Ticker}</h1>
    <h2 className="card-subtitle">Current Price: {data.c} USD</h2>
    <h2 className="card-subtitle">Day High: {data.h} USD</h2>
    <h2 className="card-subtitle">Day Low: {data.l} USD</h2>
    <h2 className="card-subtitle">Open: {data.o} USD</h2>
    <h2 className="card-subtitle">Previous Close: {data.pc} USD</h2>
  </div>
  );
};

export default StockData;
