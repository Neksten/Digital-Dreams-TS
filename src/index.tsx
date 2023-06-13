import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store";
import {products} from "./local-data";

// если нету корзины, то создать пустую
if (!localStorage.getItem('cart')) {
	localStorage.setItem('cart', JSON.stringify({products: [], finalPrice: 0, finalSale: 0}))
}
if (!localStorage.getItem('products')) {
	localStorage.setItem('products', JSON.stringify(products))
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
	  <App />
  </Provider>
);
