import React, {useEffect, useState} from 'react';

import {HeartFill} from "../../assets/HeartFill";
import {Heart} from "../../assets/Heart";
import {IProduct} from "../../types/product";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {ICartProduct} from "../../types/cart";
import Counter from "../Counter/Counter";

import styles from './CardProductInfo.module.scss';

const CardProductInfo: React.FC<IProduct> = (product) => {
	const {id, title, discountPrice, retailPrice, brand, color} = product;
	const [favorite, setFavorite] = useState(false);
	const {cart} = useTypedSelector(state => state.cart);
	const {favorites} = useTypedSelector(state => state.favorite);
	
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
	function removeCartProduct(product: IProduct) {
		removeCart(product.id);
	}
	function handleFavoriteClick(product: IProduct) {
		!favorite ? addFavorite(product) : removeFavorite(product.id);
		setFavorite(!favorite);
	}
	
	useEffect(() => {
		setFavorite(favorites.some(i => i.idProduct === id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	useEffect(() => {
		// Удалить из корзины если счётчик 0
		if (productCart && !productCart.quantity) {
			removeCartProduct(product);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productCart && productCart.quantity, id]);
	
	return (
		<div className={styles.cardProductInfo}>
			<h3 className={styles.cardProductTitle}>{title}</h3>
			<div className={styles.cardProductAmount}>
				<span className={styles.cardProductPrice}>{discountPrice} ₽</span>
				{retailPrice && <span className={styles.cardProductSale}>{retailPrice} ₽</span>}
			</div>
			<ul className={styles.cardProductSpecifications}>
				<li>
					<span>Бренд:</span>
					<span>{brand}</span>
				</li>
				<li>
					<span>Цвет:</span>
					<span>{color}</span>
				</li>
			</ul>
			<div className={styles.cardProductManagement}>
				{productCart && productCart.quantity >= 1 ?
					<div className={styles.cardProductCartBtn}>
						<Counter handleCountDecrementClick={handleCountDecrementClick}
						         handleCountIncrementClick={handleCountIncrementClick}
						         count={productCart.quantity}
						         height={'40px'}
						/>
					</div>
					:
					<div onClick={() => addCartProduct(product)} className={`${styles.cardProductCartBtn} btn`}>
						В корзину
					</div>
				}
				<div onClick={() => handleFavoriteClick(product)}>
					{favorite
						? <div className={styles.cardProductFavorite}><HeartFill/> В избранном</div>
						: <div className={styles.cardProductFavorite}><Heart/> В избранное</div>
					}
				</div>
			</div>
		</div>
	);
};

export default CardProductInfo;