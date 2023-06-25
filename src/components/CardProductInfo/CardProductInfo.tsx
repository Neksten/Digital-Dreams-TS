import React from 'react';

import {HeartFill} from '../../assets/HeartFill';
import {Heart} from '../../assets/Heart';
import {IProduct} from '../../types/product';
import Counter from '../Counter/Counter';

import useProductActions from '../../hooks/useProductActions';

import styles from './CardProductInfo.module.scss';

const CardProductInfo: React.FC<IProduct> = (product) => {
	const {title, discountPrice, retailPrice, brand, color} = product;
	const {
		favorite,
		handleCountDecrementClick,
		handleCountIncrementClick,
		productCart,
		addCartProduct,
		handleFavoriteClick,
	} = useProductActions(product);
	
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