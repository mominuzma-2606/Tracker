import { useState, useEffect } from "react";
import api from "../api";
import Stock from "../components/Stock"
import "../styles/Home.css"
import StockData from "../components/DashBoard";

function Home() {
    const [stocks, setStocks] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        getStocks();
    }, []);

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

    return (
        <div className="main-container">
            <div className="watchlist">
                <h2>Watch List</h2>
                <div className="watchlist-items">
                {stocks.map((name) => (
                    <Stock stock={name} onDelete={deleteStocks} key={stocks.id} />
                ))}
                </div>
            <div className="add-to-watchlist">
            <h2>Add a Stock to Watchlist</h2>
            <form onSubmit={createStock}>
                <label htmlFor="title">Stock Name:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <br />
                <input type="submit" value="Submit"></input>
            </form>
            </div>
            </div>
            {/* <div className="dashboard">
                <StockData Ticker= "NKE" />
            </div> */}
        </div>
    );
}

export default Home;
