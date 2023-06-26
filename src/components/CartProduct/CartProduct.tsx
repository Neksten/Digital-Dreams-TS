import React, {useCallback} from 'react';

import classNames from 'classnames/bind';

import {Link} from 'react-router-dom';

import {Cross} from '../../assets/Cross';
import {IProduct} from '../../types/product';
import Counter from '../Counter/Counter';

import useProductActions from '../../hooks/useProductActions';

import styles from './CartProduct.module.scss';

const cx = classNames.bind(styles);

interface ICartProductProps {
	product: IProduct | undefined;
	quantity: number;
}

const CartProduct: React.FC<ICartProductProps> = ({product, quantity}) => {
	if (!product) {
		return null; // Обработка случая, когда продукт не определён
	}
	
	const {
		favorite,
		handleCountDecrementClick,
		handleCountIncrementClick,
		removeCartProduct,
		handleFavoriteClick,
	} = useProductActions(product);
	
	const handleDecrementClick = useCallback(() => {
		if (quantity !== 1) {
			handleCountDecrementClick();
		}
	}, [handleCountDecrementClick, quantity]);
	
	return (
		<div className={styles.cartProduct}>
			<Link to={`/card/${product.id}`}>
				<div className={styles.image}>
					<img src={product.images[0]} alt="cart product"/>
				</div>
			</Link>
			<div className={styles.info}>
				<div className={styles.left}>
					<Link to={`/card/${product.id}`}>
						<p className={styles.name}>{product.title}</p>
					</Link>
					<div>
						<span className={styles.brand}>{product.brand}</span>
						<div className={styles.management}>
							<div onClick={() => product && handleFavoriteClick(product)} className={styles.favorite}>
								{
									favorite
										? <span style={{color: '#F93E3E'}}>В избранном</span>
										: <span>В избранное</span>
								}
							</div>
							|
							<div onClick={() => removeCartProduct()} className={styles.remove}>
								<Cross/>
								<span>Удалить</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.amount}>
						<span className={cx(`${styles.price}`, {
							black: !product.retailPrice,
						})}>
							{product.discountPrice} ₽
						</span>
						{product.retailPrice && <span className={styles.sale}>{product.retailPrice} ₽</span>}
					</div>
					<Counter handleCountDecrementClick={handleDecrementClick}
					         handleCountIncrementClick={handleCountIncrementClick}
					         count={quantity}
					         hideNull={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default CartProduct;