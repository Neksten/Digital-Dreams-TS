import {useState, useEffect} from 'react';

import {ICartProduct} from '../types/cart';
import {IProduct} from '../types/product';

import {useTypedSelector} from './useTypedSelector';
import {useActions} from './useActions';

function useProductActions(product: IProduct) {
	const {id} = product;
	const [favorite, setFavorite] = useState<boolean>(false);
	const {cart, favorites} = useTypedSelector(state => ({
		cart: state.cart.cart,
		favorites: state.favorite.favorites,
	}));
	
	// Получаем элемент из корзины если он есть
	const productCart: ICartProduct | undefined = [...cart].find((i) => i.idProduct === product.id);
	
	const {
		addCart,
		removeCart,
		productCountDecrementClick,
		productCountIncrementClick,
		addFavorite,
		removeFavorite,
	} = useActions();
	
	function handleCountDecrementClick() {
		productCountDecrementClick(id);
	}
	
	function handleCountIncrementClick() {
		productCountIncrementClick(id);
	}
	
	function addCartProduct(product: IProduct) {
		addCart(product);
	}
	
	const removeCartProduct = () => {
		removeCart(id);
	};
	
	function handleFavoriteClick(product: IProduct) {
		!favorite ? addFavorite(product) : removeFavorite(id);
		setFavorite(!favorite);
	}
	
	useEffect(() => {
		setFavorite(favorites.some(i => i.idProduct === id));
	}, [favorites, id]);
	
	useEffect(() => {
		if (productCart && !productCart.quantity) {
			removeCartProduct();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productCart]);
	
	return {
		favorite,
		handleCountDecrementClick,
		handleCountIncrementClick,
		addCartProduct,
		removeCartProduct,
		handleFavoriteClick,
		productCart,
	};
}

export default useProductActions;
