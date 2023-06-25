import React, {useEffect, useRef, useState} from 'react';

import styles from './FormReviewTextarea.module.scss';

interface IFormReviewTextareaProps {
	htmlFor: string;
	name: string;
	value: string;
	setValue: (value: string) => void;
}

const MAX_LENGTH = 2000;

const FormReviewTextarea: React.FC<IFormReviewTextareaProps> = ({htmlFor, name, value, setValue}) => {
	const [length, setLength] = useState<number>(MAX_LENGTH);
	const [textError, setTextError] = useState<string>('');
	const textareaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
	
	useEffect(() => {
		if (value.length > MAX_LENGTH) {
			setValue(value.slice(0, MAX_LENGTH));
		}
		setLength(MAX_LENGTH - value.length);
	}, [setValue, value]);
	
	const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		if (e.target.value.length >= 3) {
			resetTextareaStyles();
		}
		setValue(e.target.value);
	};
	
	function textareaClick() {
		if (textareaRef.current) {
			textareaRef.current.style.border = '1px solid #c20000';
		}
	}
	
	function onBlurTextarea(): void {
		const errorMessages: {[key: string]: string} = {
			comment: 'Поле должно содержать не менее 3 символов',
		};
		
		switch (htmlFor) {
			case 'comment':
				if (value.length < 3) {
					errorStatus(errorMessages[htmlFor]);
				} else {
					resetTextareaStyles();
				}
				break;
			default:
				resetTextareaStyles();
				break;
		}
	}
	
	const errorStatus = (text: string): void => {
		setTextError(text);
		if (textareaRef.current) {
			textareaRef.current.style.border = '1px solid #c20000';
		}
	};
	
	const resetTextareaStyles = (): void => {
		if (textareaRef.current) {
			textareaRef.current.style.border = '1px solid #e4e4e4';
		}
		setTextError('');
	};
	
	return (
		<div className={styles.formReviewTextarea}>
			<label htmlFor={htmlFor}>{name}</label>
			<textarea ref={textareaRef}
			          onClick={textareaClick}
			          onChange={onChangeTextarea}
			          onBlur={onBlurTextarea}
			          value={value}
			          name={htmlFor}
			          id=""
			/>
			{textError && <span className={styles.error}>{textError}</span>}
			<span>Осталось символов: {length}</span>
		</div>
	);
};

export default FormReviewTextarea;