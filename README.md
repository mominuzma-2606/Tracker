# Stock Monitoring App

## Overview

The Stock Monitoring App is a React-based web application that allows users to manage a watchlist of stocks. Users can add stocks to their watchlist, delete stocks from it, and view detailed information about each stock. The app uses the Finnhub API to fetch stock data and provides a fast search experience using a Binary Search Tree (BST) for stock suggestions.

## Features

- Add stocks to a watchlist.
- Delete stocks from the watchlist.
- View detailed information about selected stocks.
- Real-time search suggestions using stock descriptions.
- Fast search operations using a Binary Search Tree (BST).

## Tech Stack

- React
- Django
- SQLlite
- Axios
- Finnhub API
- Autosuggest
- CSS

## Getting Started

### Prerequisites

- Node.js
- npm (or yarn)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/mominuzma-2606/Tracker.git
   cd Tracker
   ```

2. Install frontend dependencies:
   ```sh
   cd frontend
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and add your Finnhub API key:
   ```
   VITE_FINNHUB_API_KEY=your_finnhub_api_key
   ```

4. Install backend dependencies:
   ```sh
   cd ../backend
   python -m venv env
   source env/bin/activate   # On Windows use `env\Scripts\activate`
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the `backend` directory and add your Django secret key:
   ```
   SECRET_KEY=your_django_secret_key
   ```

6. Apply Django migrations:
   ```sh
   python manage.py migrate
   ```

### Running the App

1. Start the Django development server:
   ```sh
   python manage.py runserver
   ```

2. Start the React development server:
   ```sh
   cd ../frontend
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000

## Usage

### Adding a Stock

1. Type the name of the stock in the search bar.
2. Select the desired stock from the dropdown suggestions.
3. Click "Submit" to add the stock to your watchlist.

### Deleting a Stock

1. Click the "Delete" button next to the stock you want to remove from the watchlist.

### Viewing Stock Data

1. Click on a stock in the watchlist to view detailed information.

## Code Overview

### Components

- `Home.js`: Main component that handles fetching and displaying stocks, as well as managing the watchlist.
- `Stock.js`: Component to display individual stock items in the watchlist.
- `DashBoard.js`: Component to display detailed information about a selected stock.
- `LoadingIndicator.js`: Component to display a loading spinner during async operations.

### API Integration

- `api.js`: Axios instance configured to communicate with the backend API.

### Styles

- `Form.css`: Styles for the form components.
- `Home.css`: Styles for the main home page and components.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [mominuzma8861@gmail.com](mailto:your-email@example.com).

---

Thank you for using the Stock Monitoring App! Happy investing! 📈
