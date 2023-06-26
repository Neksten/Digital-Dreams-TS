import React, {useRef, useState} from 'react';

import styles from './CustomInputForm.module.scss';

interface ICustomInputFormProps {
	name: string,
	htmlFor: string,
	placeholder: string
	value: string,
	setValue: (value: string) => void;
	handleClick?: () => void;
	handleBlur?: () => void;
}

const CustomInputForm: React.FC<ICustomInputFormProps> = ({
	                                                          name,
	                                                          htmlFor,
	                                                          placeholder,
	                                                          value,
	                                                          setValue,
	                                                          handleClick,
	                                                          handleBlur,
                                                          }) => {
	const [textError, setTextError] = useState<string>('');
	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	
	const errorStatus = (text: string): void => {
		setTextError(text);
		if (inputRef.current) {
			inputRef.current.style.borderBottom = '1px solid #c20000';
		}
	};
	
	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const {value} = e.target;
		
		const validationConditions: { [key: string]: boolean } = {
			userName: /^([a-zA-Zа-яА-Я]+)$/.test(value) || value === '',
			userSurname: /^([a-zA-Zа-яА-Я]+)$/.test(value) || value === '',
			userPhone: value.length <= 12 && /^\d+$/.test(value.slice(1)),
			cardNumber: value.length <= 16 && (/^\d+$/.test(value) || value === ''),
			cardHolder: value.length <= 20 && (/^([a-zA-Zа-яА-Я]+)$/.test(value) || value === ''),
			cardCvv: value.length <= 3 && (/^\d+$/.test(value) || value === ''),
			releaseMonth: Number(value) <= 12 && value.length <= 2 && (/^\d+$/.test(value) || value === ''),
			releaseYear: Number(value) <= 23 && value.length <= 2 && (/^\d+$/.test(value) || value === ''),
		};
		
		const isValid = !validationConditions.hasOwnProperty(htmlFor) || validationConditions[htmlFor];
		isValid && setValue(value);
	};
	
	const inputClick = (e: React.FocusEvent<HTMLInputElement>): void => {
		if (inputRef.current) {
			e.currentTarget.style.borderBottom = '1px solid #000';
			inputRef.current.focus();
		}
		
		switch (htmlFor) {
			case 'userPhone':
				value.length === 0 && setValue('+7');
				setTextError('');
				break;
			case 'cardCvv':
				setTextError('');
				break;
			default:
				setTextError('');
		}
		
		setTextError('');
		handleClick && handleClick();
	};
	
	const onBlurCustomInput = (): void => {
		const errorMessages: { [key: string]: string } = {
			userPhone: 'Номер телефона должен состоять из 11 цифр.',
			userEmail: 'Введите почту правильно',
			cardCvv: 'Введите cvv',
			cardHolder: 'Введите владельца',
			cardNumber: 'Введите номер карты',
			userName: 'Введите имя',
			userSurname: 'Введите фамилию',
			releaseMonth: 'Введите месяц выпуска',
			releaseYear: 'Введите год выпуска',
		};
		
		switch (htmlFor) {
			case 'userPhone':
				if (value.length !== 12) {
					errorStatus(errorMessages[htmlFor]);
				}
				break;
			case 'userEmail':
				const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
				!valid && errorStatus(errorMessages[htmlFor]);
				break;
			case 'cardCvv':
				if (value.length < 3) {
					errorStatus(errorMessages[htmlFor]);
				}
				break;
			case 'cardNumber':
				if (value.length < 16) {
					errorStatus(errorMessages[htmlFor]);
				}
				break;
			case 'cardHolder':
			case 'userName':
			case 'userSurname':
			case 'releaseMonth':
			case 'releaseYear':
				if (value.length <= 1) {
					errorStatus(errorMessages[htmlFor]);
				}
				break;
			default:
				break;
		}
		handleBlur && handleBlur();
	};
	
	
	return (
		<div className={styles.customInput}>
			<label htmlFor={htmlFor}>{name}*</label>
			<input ref={inputRef}
			       value={value}
			       onChange={onChangeInput}
			       onFocus={(e) => inputClick(e)}
			       onBlur={onBlurCustomInput}
			       type="text"
			       placeholder={`Введите ${placeholder && placeholder.toLowerCase()}`}
			       id={name}
			       name={name}
			/>
			{textError && <span className={styles.error}>{textError}</span>}
		</div>
	);
};

export default CustomInputForm;