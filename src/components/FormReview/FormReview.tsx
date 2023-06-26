import React, {useCallback, useState} from 'react';

import CustomInputForm from '../CustomInputForm/CustomInputForm';
import {Cross} from '../../assets/Cross';
import OutsideClickHandler from '../OutsideClickHandler';

import Rating from '../Rating/Rating';
import {IReview, IReviewState} from '../../types/review';
import {useActions} from '../../hooks/useActions';

import FormReviewTextarea from './FormReviewTextarea/FormReviewTextarea';
import styles from './FormReview.module.scss';

interface IFormReviewProps {
	setOpenForm: (value: boolean) => void;
	idProduct: number;
}

const initialFormReviewData: IReviewState = {
	userName: '',
	estimation: 5,
	dignities: '',
	disadvantages: '',
	comment: '',
};

const FormReview: React.FC<IFormReviewProps> = ({setOpenForm, idProduct}) => {
	const [formReview, setFormReview] = useState<IReviewState>(initialFormReviewData);
	const {userName, dignities, disadvantages, comment} = formReview;
	const {addReview} = useActions();
	
	const handleClose = useCallback((): void => {
		setOpenForm(false);
	}, [setOpenForm]);
	
	const handleChange = useCallback((name: string, value: string | number): void => {
		setFormReview((prevData: IReviewState) => ({
			...prevData,
			[name]: value,
		}));
	}, []);
	
	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();
		const newReview: IReview = {
			id: Date.now(),
			date: new Date().toLocaleDateString().replace(/\//g, '.'),
			...formReview,
		};
		
		addReview({idProduct, review: newReview});
		
		setFormReview(initialFormReviewData);
		setOpenForm(false);
	};
	
	const isValidForm = comment.length >= 3 && userName.length >= 2;
	
	return (
		<div className={styles.formReview}>
			<div className={styles.formReviewWrap}>
				<OutsideClickHandler onOutsideClick={setOpenForm}>
					<form onSubmit={handleSubmit} className={styles.formReviewContent}>
						<div onClick={handleClose} className={styles.formReviewClose}>
							<Cross/>
						</div>
						<h4>Новый отзыв</h4>
						<div className={styles.formReviewInputName}>
							<CustomInputForm name="Ваше имя"
							                 htmlFor="userName"
							                 placeholder="ваше имя"
							                 value={userName}
							                 setValue={(value) => handleChange('userName', value)}/>
						</div>
						<Rating setRating={(value) => handleChange('estimation', value)}/>
						<div className={styles.formReviewItems}>
							<FormReviewTextarea
								htmlFor={'dignities'}
								name={'Достоинства'}
								value={dignities}
								setValue={(value) => handleChange('dignities', value)}/>
							<FormReviewTextarea
								htmlFor={'disadvantages'}
								name={'Недостатки'}
								value={disadvantages}
								setValue={(value) => handleChange('disadvantages', value)}/>
							<FormReviewTextarea
								htmlFor={'comment'}
								name={'Комментарий'}
								value={comment}
								setValue={(value) => handleChange('comment', value)}/>
						</div>
						<button type="submit"
						        style={isValidForm ? {} : {opacity: '0.6', cursor: 'default'}}
						        className={`${styles.formReviewBtn} btn`}
						        disabled={!isValidForm}
						>
							Оставить отзыв
						</button>
					</form>
				</OutsideClickHandler>
			</div>
		</div>
	);
};

export default FormReview;