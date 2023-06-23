import React, {useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';

import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';
import {IProduct} from '../../types/product';
import SliderCard from '../../components/SliderCard/SliderCard';

import styles from './Card.module.scss';
import CardProductInfo from "../../components/CardProductInfo/CardProductInfo";
import {Loading} from "../../assets/Loading";
import CardProductReviews from "../../components/CardProductReviews/CardProductReviews";
import CustomInputForm from "../../components/CustomInputForm/CustomInputForm";
import {Star} from "../../assets/Star";

const optionsMenu: string[] = ['Описание', 'Отзывы'];

const Card: React.FC = () => {
	const {id} = useParams();
	const {filteredProducts, loading} = useTypedSelector(state => state.product);
	const {axiosGetFavorite, axiosGetProducts, axiosGetCart} = useActions();
	const [selectedOptionMenu, setSelectedOptionMenu] = useState(optionsMenu[1]);
	const [userName, setUserName] = useState('');
	
	const product: IProduct | undefined = filteredProducts.find((i) => i.id === Number(id));
	
	// закрузка данных
	useEffect(() => {
		axiosGetFavorite();
		axiosGetProducts();
		axiosGetCart();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	
	return (
		<main className={`${styles.card} page`}>
			{/*<div className="formReview">*/}
			{/*	<div className="formReviewContent">*/}
			{/*		<h4>Новый отзыв</h4>*/}
			{/*		<div className="formReviewInputName">*/}
			{/*			<CustomInputForm name="Ваше имя"*/}
			{/*			                 htmlFor="userName"*/}
			{/*			                 placeholder="ваше имя"*/}
			{/*			                 value={userName}*/}
			{/*			                 setValue={setUserName}/>*/}
			{/*		</div>*/}
			{/*		<div className="formReviewRating">*/}
			{/*			<div className="formReviewStars">*/}
			{/*				<Star/>*/}
			{/*				<Star/>*/}
			{/*				<Star/>*/}
			{/*				<Star/>*/}
			{/*				<Star/>*/}
			{/*			</div>*/}
			{/*			<span>- Ваша оценка</span>*/}
			{/*		</div>*/}
			{/*		<div className="formReviewTextarea">*/}
			{/*			<label>Достоинства</label>*/}
			{/*			<textarea name="" id=""/>*/}
			{/*			<span>Осталось символов: 2000</span>*/}
			{/*		</div>*/}
			{/*		<div className="formReviewTextarea">*/}
			{/*			<label>Недостатки</label>*/}
			{/*			<textarea name="" id=""/>*/}
			{/*			<span>Осталось символов: 2000</span>*/}
			{/*		</div>*/}
			{/*		<div className="formReviewTextarea">*/}
			{/*			<label>Комментарий</label>*/}
			{/*			<textarea name="" id=""/>*/}
			{/*			<span>Осталось символов: 2000</span>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}
			{loading
				?
				<div className={styles.loading}>
					<div className="container">
						<div className={styles.content}>
							<div className={styles.image}><Loading/></div>
							<h3>ЗАГРУЗКА</h3>
						</div>
					</div>
				</div>
				:
				product && Object.keys(product).length > 0
					?
						<div className="container">
							<section>
								<div className={styles.cardBreadCrumbs}>
									<span>Каталог/</span>
									<span>{product.brand}</span>
								</div>
								<div className={styles.cardProduct}>
									<SliderCard images={product.images}/>
									<CardProductInfo {...product}/>
								</div>
							</section>
							<nav className={styles.cardMenu}>
								<ul className={styles.cardList}>
									{optionsMenu.map(i =>
										<li key={i}
										    style={selectedOptionMenu === i ? {opacity: '1'} : {}}
										    onClick={() => setSelectedOptionMenu(i)}>
											{i}
										</li>,
									)}
								</ul>
							</nav>
							<section className={styles.cardInfo}>
								<h4>{selectedOptionMenu}</h4>
								{selectedOptionMenu === 'Описание' && <p>{product.description}</p>}
								{selectedOptionMenu === 'Отзывы' && <CardProductReviews product={product}/>}
							</section>
						</div>
					:
						<div>Пусто</div>
			}
		</main>
	);
};

export default Card;