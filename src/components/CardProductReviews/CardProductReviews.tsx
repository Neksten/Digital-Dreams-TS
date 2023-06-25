import React from 'react';

import {IProduct} from '../../types/product';

import CardReview from './CardReview/CardReview';
import styles from './CardProductReviews.module.scss';

interface ICardProductReviewsProps {
	product: IProduct;
	setOpenForm: (value: boolean) => void;
}

const CardProductReviews: React.FC<ICardProductReviewsProps> = ({product, setOpenForm}) => {
	const {reviews} = product;
	
	return (
		<div className={styles.cardReviews}>
			<div onClick={() => setOpenForm(true)} className={`${styles.reviewsBtn} btn`}>Оставить отзыв</div>
			{reviews.length > 0
				?
				<div className={styles.reviews}>
					{reviews.map(i => (
						<CardReview key={i.id} review={i}/>
					))}
				</div>
				:
				<span className={styles.zero}>Ваш отзыв может стать первым!</span>
			}
		</div>
	);
};

export default CardProductReviews;