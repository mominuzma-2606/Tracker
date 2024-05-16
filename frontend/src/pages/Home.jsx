import { useState, useEffect } from "react";
import api from "../api";
import Stock from "../components/Stock";
import "../styles/Home.css";
import StockData from "../components/DashBoard";
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

// BST Node class
class TreeNode {
  constructor(symbol, name) {
    this.symbol = symbol;
    this.name = name;
    this.left = null;
    this.right = null;
  }
}

// BST class
class BST {
  constructor() {
    this.root = null;
  }

  insert(symbol, name) {
    const newNode = new TreeNode(symbol, name);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.name.toLowerCase() < node.name.toLowerCase()) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  search(node, value) {
    if (node === null) {
      return [];
    }

    const lowerValue = value.toLowerCase();
    const lowerNodeName = node.name.toLowerCase();
    if (lowerNodeName.includes(lowerValue)) {
      return [
        { symbol: node.symbol, name: node.name },
        ...this.search(node.left, value),
        ...this.search(node.right, value),
      ];
    } else if (lowerValue < lowerNodeName) {
      return this.search(node.left, value);
    } else {
      return this.search(node.right, value);
    }
  }

  find(value) {
    return this.search(this.root, value);
  }
}

function Home() {
  const [stocks, setStocks] = useState([]);
  const [name, setName] = useState("");
  const [current, setCurrent] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [bst, setBst] = useState(new BST());

  useEffect(() => {
    getStocks();
    fetchStockSymbols();
  }, []);

  const fetchStockSymbols = async () => {
    const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
    try {
      const response = await axios.get('https://finnhub.io/api/v1/stock/symbol', {
        params: {
          exchange: 'US',
          token: apiKey
        }
      });
      const symbols = response.data.map(stock => ({
        name: stock.description,
        symbol: stock.symbol
      }));
      const newBst = new BST();
      symbols.forEach(stock => newBst.insert(stock.symbol, stock.name));
      setBst(newBst);
    } catch (error) {
      console.error('Error fetching stock symbols:', error);
    }
  };

  const getStocks = () => {
    api
      .get("/api/stocks/")
      .then((res) => res.data)
      .then((data) => {
        setStocks(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteStocks = (id) => {
    api
      .delete(`/api/stocks/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Stock deleted!");
        else alert("Failed to delete stock.");
        getStocks();
      })
      .catch((error) => alert(error));
  };

  const createStock = (e) => {
    e.preventDefault();
    api
      .post("/api/stocks/", { name })
      .then((res) => {
        if (res.status === 201) alert("Stock added!");
        else alert("Failed to add stock.");
        getStocks();
      })
      .catch((err) => alert(err));
  };

  const getData = (name) => {
    setCurrent(name);
  };

  const getSuggestions = (value) => {
    if (!value) return [];
    return bst.find(value);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const fetchedSuggestions = getSuggestions(value);
    setSuggestions(fetchedSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.symbol;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.symbol} - {suggestion.name}
    </div>
  );

  const onSuggestionSelected = (event, { suggestion }) => {
    setName(suggestion.symbol);
  };

  return (
    <div className="main-container">
      <div className="watchlist">
        <h2>Watch List</h2>
        <div className="watchlist-items">
          {stocks.map((stock) => (
            <Stock
              stock={stock}
              onDelete={deleteStocks}
              key={stock.id}
              showData={getData}
            />
          ))}
        </div><hr />
        <div className="add-to-watchlist">
          <h2>Add a Stock to Watchlist</h2>
          <form onSubmit={createStock}>
            <label htmlFor="title">Stock Name:</label>
            <br />
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              onSuggestionSelected={onSuggestionSelected}
              inputProps={{
                placeholder: 'Type a stock symbol',
                value: name,
                onChange: (e, { newValue }) => setName(newValue)
              }}
            />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div><hr />
      <div className="dashboard">
        <StockData Ticker={current} />
      </div>
    </div>
  );
}

export default Home;
