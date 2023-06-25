import React, {useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';

import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';
import {IProduct} from '../../types/product';
import SliderCard from '../../components/SliderCard/SliderCard';

import CardProductInfo from '../../components/CardProductInfo/CardProductInfo';
import {Loading} from '../../assets/Loading';
import CardProductReviews from '../../components/CardProductReviews/CardProductReviews';
import FormReview from '../../components/FormReview/FormReview';

import styles from './Card.module.scss';

const optionsMenu: string[] = ['Описание', 'Отзывы'];

const Card: React.FC = () => {
	const {id} = useParams();
	const {products, loading} = useTypedSelector(state => state.product);
	const {axiosGetFavorite, axiosGetProducts, axiosGetCart} = useActions();
	const [selectedOptionMenu, setSelectedOptionMenu] = useState<string>(optionsMenu[0]);
	const [openForm, setOpenForm] = useState<boolean>(false);
	
	const product: IProduct | undefined = products.find((i) => i.id === Number(id));
	
	// закрузка данных
	useEffect(() => {
		axiosGetFavorite();
		axiosGetProducts();
		axiosGetCart();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return (
		<main className={`${styles.card} page`}>
			{openForm && <FormReview setOpenForm={setOpenForm} idProduct={Number(id)}/>}
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
				: product?.id ?
					<div className="container">
						<section>
							<div className={styles.cardBreadCrumbs}>
								<span>Каталог /</span>
								<span>{product.brand} /</span>
								<span>{product.title}</span>
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
							{selectedOptionMenu === 'Отзывы'
								&& <CardProductReviews setOpenForm={setOpenForm} product={product}/>}
						</section>
					</div>
					:
					<div>Пусто</div>
			}
		</main>
	);
};

export default Card;