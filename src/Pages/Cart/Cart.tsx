import React, {useEffect} from 'react';

import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';
import {CartEmpty} from '../../assets/CartEmpty';
import CartProduct from '../../components/CartProduct/CartProduct';
import {IProduct} from '../../types/product';
import SidebarFinal from '../../components/SidebarFinal/SidebarFinal';

import styles from './Cart.module.scss';

const Cart: React.FC = () => {
	const {cart, finalPrice, finalSale} = useTypedSelector(state => state.cart);
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
						<span>{cartLength} товара</span>
					</div>
					{
						cartLength
							?
							<div className={styles.heroContent}>
								<div className={styles.heroProducts}>
									{cart.map(product => (
										<CartProduct key={product.id}
										             product={searchProduct(product.idProduct)}
										             quantity={product.quantity}
										/>
									))}
								</div>
								<SidebarFinal textBtn={'Перейти к оформлению'}
								              length={cartLength}
								              totalSale={finalSale}
								              totalPrice={finalPrice}
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