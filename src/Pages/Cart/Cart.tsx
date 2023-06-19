import React, {useEffect} from 'react';
import ContentLoader from 'react-content-loader';

import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';
import {CartEmpty} from '../../assets/CartEmpty';
import CartProduct from '../../components/CartProduct/CartProduct';
import {IProduct} from '../../types/product';
import SidebarFinal from '../../components/SidebarFinal/SidebarFinal';

import styles from './Cart.module.scss';

const Cart: React.FC = () => {
	const {cart, finalPrice, finalSale, loading} = useTypedSelector(state => state.cart);
	const {products} = useTypedSelector(state => state.product);
	
	const {axiosGetFavorite, axiosGetCart, axiosGetProducts} = useActions();
	
	const cartLength = cart.length;
	
	const searchProduct = (idProduct: number): IProduct | undefined =>
		products.find((i) => i.id === idProduct);
	
	useEffect(() => {
		axiosGetFavorite();
		axiosGetCart();
		axiosGetProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return (
		<main className={`${styles.cart} page`}>
			<div className="container">
				<section className={styles.heroCart}>
					<div className={styles.heroTop}>
						<h3>Корзина</h3>
						<span>{loading ? 0 : cartLength} товара</span>
					</div>
					{
						loading || cartLength
							?
							<div className={styles.heroContent}>
								<div className={styles.heroProducts}>
									{loading
										?
										[...Array(3)].map((i, idx) => (
											<div key={idx} className="loader">
												<ContentLoader
													speed={2}
													width={670}
													height={143}
													viewBox="0 0 670 143"
													backgroundColor="#f3f3f3"
													foregroundColor="#ecebeb"
												>
													<rect x="18" y="18" rx="15" ry="15" width="110" height="110" />
													<rect x="150" y="18" rx="5" ry="5" width="205" height="17" />
													<rect x="150" y="44" rx="5" ry="5" width="110" height="17" />
													<rect x="150" y="86" rx="5" ry="5" width="60" height="17" />
													<rect x="150" y="111" rx="5" ry="5" width="80" height="17" />
													<rect x="525" y="18" rx="5" ry="5" width="70" height="20" />
													<rect x="525" y="44" rx="5" ry="5" width="45" height="12" />
													<rect x="525" y="98" rx="5" ry="5" width="130" height="30" />
												</ContentLoader>
											</div>
										))
										:
										cart.map(product => (
											<CartProduct key={product.id}
											             product={searchProduct(product.idProduct)}
											             quantity={product.quantity}
											/>
										))
									}
								</div>
								<SidebarFinal textBtn={'Перейти к оформлению'}
								              length={loading ? 0 : cartLength}
								              totalSale={loading ? 0 : finalSale}
								              totalPrice={loading ? 0 : finalPrice}
								              redirect={'/order'}
								/>
							</div>
							:
							<div className={styles.heroEmpty}>
								<div className={styles.content}>
									<div className={styles.image}>
										<CartEmpty/>
									</div>
									<h4>Добавьте товары в корзину</h4>
								</div>
							</div>
					}
				</section>
			</div>
		</main>
	);
};

export default Cart;