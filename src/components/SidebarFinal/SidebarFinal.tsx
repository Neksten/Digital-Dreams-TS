import React from 'react';
import {Link} from "react-router-dom";
import styles from './SidebarFinal.module.scss'

interface ISidebarFinalProps {
	redirect: string;
	textBtn: string;
	length: number;
	totalSale: number;
	totalPrice: number;
	send?: boolean;
	onSendForm?: (e: any) => void;
}

const SidebarFinal: React.FC<ISidebarFinalProps> = ({
		redirect = '/',
		textBtn,
		length,
		totalSale,
		totalPrice,
		send,
		onSendForm
	}) => {
	
	const handleSendForm = (e: any) => {
		if (send && onSendForm) {
			onSendForm(e)
		}
	}
	
	return (
		<div className={styles.heroSidebar}>
			<Link to={redirect}><span onClick={handleSendForm} className={styles.arrange}>{textBtn}</span></Link>
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