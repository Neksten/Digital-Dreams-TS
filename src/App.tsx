import React, {} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './Pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cart from './Pages/Cart/Cart';
import Order from './Pages/Order/Order';
import Favorite from './Pages/Favorite/Favorite';

const App:React.FC = () => {
	return (
		<div className="App">
			<Router>
				<Header/>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/cart" element={<Cart/>}/>
					<Route path="/order" element={<Order/>}/>
					<Route path="/favorite" element={<Favorite/>}/>
				</Routes>
				<Footer/>
			</Router>
		</div>
	);
};

export default App;