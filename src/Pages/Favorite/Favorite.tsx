import React, {useEffect, useState} from 'react';
import ContentLoader from 'react-content-loader';

import Card from '../../components/Card/Card';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';

import {IProduct} from '../../types/product';
import {FavoriteEmpty} from '../../assets/FavoriteEmpty';

import styles from './Favorite.module.scss';

const Favorite = () => {
	const {products} = useTypedSelector(state => state.product);
	const {favorites, loading} = useTypedSelector(state => state.favorite);
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
						loading || favoriteLength
							?
							<div className={styles.favorites}>
								{
									loading
										?
										[...Array(10)].map((i, idx) => (
											<div key={idx} className="loader">
												<ContentLoader
													speed={2}
													width={210}
													height={320}
													viewBox="0 0 210 320"
													backgroundColor="#f3f3f3"
													foregroundColor="#ecebeb"
												>
													<rect x="15" y="173" rx="3" ry="3" width="70" height="16" />
													<rect x="15" y="280" rx="8" ry="8" width="180" height="30" />
													<rect x="38" y="10" rx="15" ry="15" width="134" height="140" />
													<rect x="480" y="30" rx="5" ry="5" width="70" height="20" />
													<rect x="480" y="56" rx="5" ry="5" width="45" height="12" />
													<rect x="480" y="110" rx="5" ry="5" width="113" height="30" />
													<rect x="15" y="196" rx="3" ry="3" width="50" height="10" />
													<rect x="15" y="227" rx="3" ry="3" width="180" height="15" />
													<rect x="15" y="248" rx="3" ry="3" width="130" height="15" />
												</ContentLoader>
											</div>
										))
										:
										favoriteProducts.map((i) =>
											<Card key={i.id} product={i}/>,
										)
								}
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