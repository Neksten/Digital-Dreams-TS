import React from 'react';

import styles  from './CardReview.module.scss';

import {Star} from "../../../assets/Star";
import {IReview} from "../../../types/review";

interface ICardReviewProps {
	review: IReview
}

const CardReview: React.FC<ICardReviewProps> = ({review}) => {
	const {userName, estimation, date, dignities, disadvantages, comment} = review;
	
	return (
		<div className={styles.review}>
			<div className={styles.reviewUser}>
				<div className={styles.reviewUserLogo}>
					<img src="../img/userLogo.png" alt=""/>
				</div>
				<div>
					<div className={styles.reviewUserTop}>
						<h5>{userName}</h5>
						<div className={styles.reviewEstimation}><Star/>{estimation}</div>
					</div>
					<div>{date}</div>
				</div>
			</div>
			<div className={styles.reviewDignities}>
				<h4 className={styles.reviewTitle}>Достоинства</h4>
				<p>{dignities}</p>
			</div>
			<div className={styles.reviewDisadvantages}>
				<h4 className={styles.reviewTitle}>Недостатки</h4>
				<p>{disadvantages}</p>
			</div>
			<div className={styles.reviewComment}>
				<h4 className={styles.reviewTitle}>Комментарий</h4>
				<p>{comment}</p>
			</div>
		</div>
	);
};

export default CardReview;