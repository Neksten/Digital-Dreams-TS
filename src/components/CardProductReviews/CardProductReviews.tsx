import React from 'react';

import {IProduct} from '../../types/product';

import CardReview from "./CardReview/CardReview";
import styles from './CardProductReviews.module.scss';

interface ICardProductReviewsProps {
	product: IProduct
}

const CardProductReviews:React.FC<ICardProductReviewsProps> = ({product}) => {
	return (
		<div className={styles.cardReviews}>
			<div className={`${styles.reviewsBtn} btn`}>Оставить отзыв</div>
			{product.reviews.length > 0
				?
				<div className={styles.reviews}>
					{product.reviews.map(i =>
						<CardReview key={i.id} review={i}/>,
					)}
				</div>
				:
				<span className={styles.zero}>Ваш отзыв может стать первым!</span>
			}
		</div>
	);
};

export default CardProductReviews;