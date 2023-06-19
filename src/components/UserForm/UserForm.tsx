import React from 'react';

import CustomInputForm from '../CustomInputForm/CustomInputForm';
import {IOrder} from '../../types/order';

import styles from './UserForm.module.scss';

interface IUserProps {
	formData: IOrder;
	setFormData: (value: (prevData: IOrder) => IOrder) => void;
}

const UserForm: React.FC<IUserProps> = ({formData, setFormData}) => {
	
	const handleChange = (name: string, value: string): void => {
		setFormData((prevData: IOrder) => ({
			...prevData,
			user: {
				...prevData.user,
				[name]: value,
			},
		}));
	};
	
	return (
		<form action="" className={styles.userForm}>
			<div className={styles.userFormRow}>
				<CustomInputForm name="Имя"
				                 htmlFor="userName"
				                 placeholder="Имя"
				                 value={formData.user.userName}
				                 setValue={(value) => handleChange('userName', value)}/>
				<CustomInputForm name="Фамилия"
				                 htmlFor="userSurname"
				                 placeholder="Фамилия"
				                 value={formData.user.userSurname}
				                 setValue={(value) => handleChange('userSurname', value)}/>
			</div>
			<div className={styles.userFormRow}>
				<CustomInputForm name="Телефон"
				                 htmlFor="userPhone"
				                 placeholder="Телефон"
				                 value={formData.user.userPhone}
				                 setValue={(value) => handleChange('userPhone', value)}/>
				<CustomInputForm name="Email"
				                 htmlFor="userEmail"
				                 placeholder="Email"
				                 value={formData.user.userEmail}
				                 setValue={(value) => handleChange('userEmail', value)}/>
			</div>
		</form>
	);
};

export default UserForm;