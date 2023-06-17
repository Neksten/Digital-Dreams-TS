import React, {useState} from 'react';

import CreditCard from '../CreditCard/CreditCard';
import CustomInputForm from '../CustomInputForm/CustomInputForm';

import {IOrder} from '../../types/Order';

import styles from './CreditCardForm.module.scss';

interface ICreditCardFormProps {
	formData: IOrder;
	setFormData: (value: (prevData: IOrder) => IOrder) => void;
}

const CreditCardForm: React.FC<ICreditCardFormProps> = ({formData, setFormData}) => {
	const [flipped, setFlipped] = useState(false);
	// Приводим номер карты к нужному формату
	const formattedNumber = (str: string): string => {
		return str.replace(/\d{4}(?=.)/g, '$& ');
	};
	
	const handleChange = (name: string, value: string): void => {
		setFormData((prevData: IOrder) => ({
			...prevData,
			creditCard: {
				...prevData.creditCard,
				[name]: value,
			},
		}));
	};
	
	return (
		<div className={styles.creditCardForm}>
			<div className={styles.creditCard}>
				<CreditCard number={formData.creditCard.cardNumber
															? formattedNumber(String(formData.creditCard.cardNumber))
															: formattedNumber('1234567890123456')}
				            name={formData.creditCard.cardHolder.toUpperCase()}
				            expiry="1225"
				            cvv={formData.creditCard.cardCvv ? formData.creditCard.cardCvv : '123'}
				            flipped={flipped}
				/>
			</div>
			<form action="">
				<div className={styles.row}>
					<CustomInputForm value={formData.creditCard.cardNumber}
					                 setValue={(value) => handleChange('cardNumber', value)}
					                 name="Номер карты"
					                 htmlFor="cardNumber"
					                 placeholder="номер карты"/>
					<CustomInputForm value={formData.creditCard.cardHolder}
					                 setValue={(value) => handleChange('cardHolder', value)}
					                 name="Владелец карты"
					                 htmlFor="cardHolder"
					                 placeholder="владельца"/>
				</div>
				<div className={styles.row}>
					<div className={styles.row}>
						<CustomInputForm value={formData.creditCard.cardMonth}
						                 setValue={(value) => handleChange('cardMonth', value)}
						                 name="Месяц выпуска"
						                 htmlFor="releaseMonth"
						                 placeholder="месяц "/>
						<CustomInputForm value={formData.creditCard.cardYear}
						                 setValue={(value) => handleChange('cardYear', value)}
						                 name="Год выпуска"
						                 htmlFor="releaseYear"
						                 placeholder="год"/>
					</div>
					<CustomInputForm value={formData.creditCard.cardCvv}
					                 setValue={(value) => handleChange('cardCvv', value)}
					                 name="CVV"
					                 htmlFor="cardCvv"
					                 placeholder="cvv"
					                 setFlipped={setFlipped}/>
				</div>
			</form>
		</div>
	);
};

export default CreditCardForm;