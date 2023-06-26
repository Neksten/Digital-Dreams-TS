import {useState, useEffect, useMemo, useCallback} from 'react';

import {ICartProduct} from '../types/cart';
import {IProduct} from '../types/product';

import {useTypedSelector} from './useTypedSelector';
import {useActions} from './useActions';

const useProductActions = (product: IProduct) => {
	const {id} = product;
	const [favorite, setFavorite] = useState<boolean>(false);
	const {cart, favorites} = useTypedSelector(state => ({
		cart: state.cart.cart,
		favorites: state.favorite.favorites,
	}));
	
	// Получаем элемент из корзины если он есть
	const productCart: ICartProduct | undefined = useMemo(
		() => [...cart].find((i) => i.idProduct === product.id),
		[cart, product.id]);
	
	const {
		addCart,
		removeCart,
		productCountDecrementClick,
		productCountIncrementClick,
		addFavorite,
		removeFavorite,
	} = useActions();
	
	const handleCountDecrementClick = useCallback(() => {
		productCountDecrementClick(id);
	}, [id, productCountDecrementClick]);
	
	const handleCountIncrementClick = useCallback(() => {
		productCountIncrementClick(id);
	}, [id, productCountIncrementClick]);
	
	const addCartProduct = useCallback((product: IProduct) => {
		addCart(product);
	}, [addCart]);
	
	const removeCartProduct = useCallback(() => {
		removeCart(id);
	}, [removeCart, id]);
	
	const handleFavoriteClick = useCallback((product: IProduct) => {
		!favorite ? addFavorite(product) : removeFavorite(id);
		setFavorite(!favorite);
	}, [favorite, addFavorite, removeFavorite, id]);
	
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
};

export default useProductActions;
