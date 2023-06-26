import React from 'react';
import {Link} from 'react-router-dom';

import styles from './SidebarFinal.module.scss';

interface ISidebarFinalProps {
	redirect?: string | undefined;
	textBtn: string;
	length: number;
	totalSale: number;
	totalPrice: number;
	send?: boolean;
	onSendForm?: (e: React.FormEvent<HTMLSpanElement>) => void;
}

const SidebarFinal: React.FC<ISidebarFinalProps> = (
	{
		redirect,
		textBtn,
		length,
		totalSale,
		totalPrice,
		send,
		onSendForm,
	}) => {
	
	return (
		<div className={styles.heroSidebar}>
			<Link to={redirect ? redirect : ''}>
				<span onClick={(e) => send && onSendForm && onSendForm(e)}
				      className={`${styles.arrange} btn`}>
					{textBtn}
				</span>
			</Link>
			<div className={styles.info}>
				<span className={styles.total}>Всего: {length} товара</span>
				<div className={styles.sale}>
					<span className={styles.title}>Скидка</span>
					<span className={styles.price}>{totalSale} ₽</span>
				</div>
				<div className={styles.totalPrice}>
					<span className={styles.title}>Итого</span>
					<span className={styles.price}>{totalPrice} ₽</span>
				</div>
			</div>
		</div>
	);
};

export default SidebarFinal;