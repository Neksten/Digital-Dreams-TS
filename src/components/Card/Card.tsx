import React, {useEffect} from 'react';

import {IProduct} from '../../types/product';
import Counter from '../Counter/Counter';
import {useActions} from '../../hooks/useActions';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {ICartProduct} from '../../types/cart';

import styles from './Card.module.scss';

interface ICardProps {
	product: IProduct
}

const Card: React.FC<ICardProps> = ({product}) => {
	const {cart} = useTypedSelector(state => state.cart);
	const {addCart, removeCart, productCountDecrementClick, productCountIncrementClick} = useActions();
	// Получаем элемент из корзины если он есть
	const productCart: ICartProduct | undefined = [...cart].find((i) => i.idProduct === product.id);
	
	function handleCountDecrementClick() {
		productCountDecrementClick(product.id);
	}
	function handleCountIncrementClick() {
		productCountIncrementClick(product.id);
	}
	function addCartProduct(product: IProduct) {
		addCart(product);
	}
	function removeCartProduct(product: IProduct) {
		removeCart(product.id);
	}
	
	useEffect(() => {
		// Удалить из корзины если счётчик 0
		if (productCart && !productCart.quantity) {
			removeCartProduct(product);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productCart && productCart.quantity, product.id]);
	
	return (
		<div className={styles.card}>
			<div className={styles.cardBody}>
				<div className={styles.cardImage}>
					<img src={product.imgUrl} alt="product"/>
				</div>
				<span className={styles.cardPrice}>{product.discountPrice} ₽</span>
				{product.retailPrice && <span className={styles.cardSale}>{product.retailPrice} ₽</span>}
				<p className={styles.cardName}>{product.title}</p>
			</div>
			{productCart && productCart.quantity >= 1 ?
				<Counter handleCountDecrementClick={handleCountDecrementClick}
				         handleCountIncrementClick={handleCountIncrementClick}
				         count={productCart.quantity}/>
				:
				<div onClick={() => addCartProduct(product)} className={styles.cardBtn}>В корзину</div>
			}
		</div>
	);
};

export default Card;