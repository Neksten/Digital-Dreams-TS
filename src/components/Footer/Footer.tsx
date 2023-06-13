import React from 'react';
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
	return (
		<footer className={styles.footer}>
			<div className="container">
				<div className={styles.content}>
					<div className={styles.info}>
						<h5>Digital <span>Dreams</span></h5>
						<h4>Контакты</h4>
						<p>ИП Иванов Иван Иванович </p>
						<p>ИНН: 553259888352. ОГРНИП:
							43785349292577. Российская Федерация, Москва</p>
						<span>&copy;&nbsp;Sole Stride, 2023</span>
					</div>
					<div className={styles.item}>
						<h4>О компании</h4>
						<ul>
							<li>Обратная связь</li>
							<li>О нас</li>
							<li>Политика конфиденциальности</li>
							<li>Пользовательское соглашение</li>
						</ul>
					</div>
					<div className={styles.item}>
						<h4>Социальные сети</h4>
						<ul>
							<li>ВКонтакте</li>
							<li>Instagram</li>
							<li>Telegram</li>
						</ul>
					</div>
					<div className={styles.item}>
						<h4>Подарочные карты</h4>
						<ul>
							<li>Электронные подарочные карты</li>
							<li>Физические подарочные карты</li>
							<li>Проверить свой баланс</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;