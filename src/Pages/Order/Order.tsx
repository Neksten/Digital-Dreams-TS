import React, {useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';

import SidebarFinal from '../../components/SidebarFinal/SidebarFinal';
import YandexMap from '../../components/YandexMap/YandexMap';

import CreditCardForm from '../../components/CreditCardForm/CreditCardForm';
import UserForm from '../../components/UserForm/UserForm';
import {IOrder} from '../../types/order';
import {addresses} from '../../local-data';
import {useActions} from '../../hooks/useActions';
import {useTypedSelector} from '../../hooks/useTypedSelector';

import styles from './Order.module.scss';

const initialFormData: IOrder = {
	user: {
		userName: '',
		userSurname: '',
		userPhone: '',
		userEmail: '',
	},
	creditCard: {
		cardHolder: '',
		cardNumber: '',
		cardCvv: '',
		cardMonth: '',
		cardYear: '',
	},
};

const Order:React.FC = () => {
	const navigate = useNavigate();
	const {cart, finalPrice, finalSale} = useTypedSelector(state => state.cart);
	const {allRemoveCart, axiosGetCart} = useActions();
	
	const [address, setAddress] = useState('');
	const [formData, setFormData] = useState(initialFormData);
	
	const onSendForm = (e: React.FormEvent<HTMLSpanElement>): void => {
		e.preventDefault();
		const {creditCard, user} = formData;
		
		if (creditCard.cardNumber.length === 16
			&& creditCard.cardHolder
			&& creditCard.cardCvv.length === 3
			&& creditCard.cardMonth
			&& creditCard.cardYear
			&& user.userPhone.length === 12
			&& user.userName
			&& user.userSurname
			&& /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.userEmail)
			&& addresses.some(i => i.address === address)
		) {
			console.log(JSON.stringify(formData));
			allRemoveCart();
			navigate('/cart');
		}
	};
	
	useEffect(() => {
		axiosGetCart();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return (
		<div>
			<main className={`${styles.order} page`}>
				<div className="container">
					<section className={styles.heroOrder}>
						<h3 className={styles.title}>Оформление</h3>
						<div className={styles.heroContent}>
							<div className={styles.heroForms}>
								<h4 className={styles.userFormTitle}>Заберёт заказ</h4>
								<UserForm formData={formData} setFormData={setFormData}/>
								<h4 className={styles.userFormTitle}>Оплата</h4>
								<div className={styles.creditCardForm}>
									<CreditCardForm formData={formData} setFormData={setFormData}/>
								</div>
								<h4 className={styles.userFormTitle}>Адрес</h4>
								<YandexMap value={address} setValue={setAddress} addresses={addresses}/>
							</div>
							<SidebarFinal textBtn="Оформить"
							              totalPrice={finalPrice}
							              totalSale={finalSale}
							              length={cart.length}
							              send
							              onSendForm={onSendForm}
							/>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};

export default Order;