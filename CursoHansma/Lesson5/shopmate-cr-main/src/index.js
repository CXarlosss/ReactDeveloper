import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import {store} from "./store/store";

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store= {store}>
      <Router>
        <CartProvider>
          <App />
        </CartProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);