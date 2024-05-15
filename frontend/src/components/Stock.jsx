import React from "react";
import "../styles/Stock.css"
import StockQuote from "./FetchPrice";

function Stock({ stock, onDelete }) {
    const formattedDate = new Date(stock.created_at).toLocaleDateString("en-US")

    return (
        <div className="stock-container">
            <p className="stock-title">{stock.name}</p>
            {/* <p className="stock-date">{formattedDate}</p> */}
            <StockQuote Ticker={stock.name} />
            <button className="delete-button" onClick={() => onDelete(stock.id)}>
                Delete
            </button>
            <button className="Show-button" onClick={() => onDelete(stock.id)}>
                Show more details
            </button>
        </div>
    );
}

export default Stock
