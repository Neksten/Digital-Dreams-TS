import React, {useMemo} from 'react';

import {Link} from 'react-router-dom';

import {IProduct} from '../../types/product';
import Counter from '../Counter/Counter';
import {Heart} from '../../assets/Heart';

import {HeartFill} from '../../assets/HeartFill';

import {Star} from '../../assets/Star';
import {Comment} from '../../assets/Comment';
import useProductActions from '../../hooks/useProductActions';

import styles from './Card.module.scss';

interface ICardProps {
	product: IProduct;
}

const Card: React.FC<ICardProps> = ({product}) => {
	const {
		favorite,
		handleCountDecrementClick,
		handleCountIncrementClick,
		addCartProduct,
		productCart,
		handleFavoriteClick,
	} = useProductActions(product);
	
	const rating = useMemo(() => (
		product.reviews.length > 0
			?
			Math.round((product.reviews.reduce((acc, i) => acc + i.estimation, 0) / product.reviews.length) * 10) / 10
			:
			0
	), [product.reviews]);
	
	return (
		<div className={styles.card}>
			<div className={styles.cardBody}>
				<div className={styles.cardFavorite} onClick={() => handleFavoriteClick(product)}>
					{favorite
						? <HeartFill/>
						: <Heart/>
					}
				</div>
				<div className={styles.cardTop}>
					<Link to={`/card/${product.id}`} className={styles.cardImage}>
						<img src={product.images[0]} alt="product"/>
					</Link>
					<span className={styles.cardPrice}>{product.discountPrice} ₽</span>
					{product.retailPrice && <span className={styles.cardSale}>{product.retailPrice} ₽</span>}
				</div>
				<Link to={`/card/${product.id}`}>
					<p className={styles.cardName}>{product.title}</p>
				</Link>
				<div className={styles.rating}>
					<div className={styles.ratingItem}>
						<div className={styles.stars}>
							<div className={styles.star}>
								<Star color={rating ? '#FF9518' : '#B7B7B7'}/>
							</div>
						</div>
						<span>{rating}</span>
					</div>
					<div className={styles.ratingItem}>
						<div className={styles.reviewsQuantity}>
							<Comment/>
						</div>
						<span>{product.reviews.length}</span>
					</div>
				</div>
			</div>
			{productCart && productCart.quantity >= 1 ?
				<Counter handleCountDecrementClick={handleCountDecrementClick}
				         handleCountIncrementClick={handleCountIncrementClick}
				         count={productCart.quantity}/>
				:
				<div onClick={() => addCartProduct(product)} className={`${styles.cardBtn} btn`}>В корзину</div>
			}
		</div>
	);
};

export default Card;