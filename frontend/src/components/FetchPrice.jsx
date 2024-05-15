import React, { useEffect, useState } from 'react';
import "../styles/Stock.css"
import axios from 'axios';

const StockQuote = ({ Ticker }) => {
  const [quote, setQuote] = useState(null);
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
        setQuote(response.data);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };

    fetchStockQuote();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!quote) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <pre>LTP: {quote['c']}</pre>
    </div>
  );
};

export default StockQuote;
