import React, {useEffect, useState} from 'react';

import Card from '../../components/Card/Card';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';

import {IProduct} from '../../types/product';
import {FavoriteEmpty} from '../../assets/FavoriteEmpty';

import styles from './Favorite.module.scss';

const Favorite = () => {
	const {products} = useTypedSelector(state => state.product);
	const {favorites} = useTypedSelector(state => state.favorite);
	const {axiosGetCart, axiosGetProducts, axiosGetFavorite} = useActions();
	const [favoriteProducts, setFavoriteProducts] = useState<IProduct[]>([]);
	
	const favoriteLength = favorites.length;
	
	useEffect(() => {
		axiosGetCart();
		axiosGetProducts();
		axiosGetFavorite();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		setFavoriteProducts(products.filter(i => favorites.some(favorite => favorite.idProduct === i.id)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [favorites]);
	
	return (
		<main className={`${styles.favorite} page`}>
			<div className="container">
				<section className={styles.heroFavorite}>
					<div className={styles.heroFavorite__top}>
						<h3>Избранное</h3>
						<span>{favoriteLength} товара</span>
					</div>
					{
						favoriteLength
							?
							<div className={styles.favorites}>
								{favoriteProducts.map((i) =>
									<Card key={i.id} product={i}/>,
								)}
							</div>
							:
							<div className={styles.heroEmpty}>
								<div className={styles.content}>
									<div className={styles.image}>
										<FavoriteEmpty/>
									</div>
									<h4>Добавьте товары в избранное</h4>
								</div>
							</div>
					}
				</section>
			</div>
		</main>
	);
};

export default Favorite;