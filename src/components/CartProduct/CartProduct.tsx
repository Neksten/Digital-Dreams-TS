import React from 'react';
import styles from './CartProduct.module.scss'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import classNames from 'classnames/bind';
import {Cross} from "../../assets/Cross";
import {IProduct} from "../../types/product";
import Counter from "../Counter/Counter";
import {useActions} from "../../hooks/useActions";
let cx = classNames.bind(styles);

interface ICartProductProps {
	product: IProduct | undefined;
	quantity: number;
}

const CartProduct: React.FC<ICartProductProps> = ({product, quantity}) => {
	const {removeCart, productCountDecrementClick, productCountIncrementClick} = useActions()
	if (!product) {
		return null; // Обработка случая, когда продукт не определён
	}
	
	const removeCartProduct = () => {
		removeCart(product.id)
	}
	const handleCountIncrementClick = () => {
		productCountIncrementClick(product.id)
	}
	const handleCountDecrementClick = () => {
		if (quantity !== 1) {
			productCountDecrementClick(product.id)
		}
	}
	
	return (
		<div className={styles.cartProduct}>
			<div className={styles.image}>
				<img src={product.imgUrl} alt="cart product"/>
			</div>
			<div className={styles.info}>
				<div className={styles.left}>
					<p className={styles.name}>{product.title}</p>
					<div>
						<span className={styles.brand}>{product.brand}</span>
						<div onClick={() => removeCartProduct()} className={styles.remove}><Cross/> <span>Удалить</span></div>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.amount}>
						<span className={cx(`${styles.price}`, {
							black: !product.retailPrice,
						})}>
							{product.discountPrice} ₽
						</span>
						{product.retailPrice && <span className={styles.sale}>{product.retailPrice} ₽</span>}
					</div>
					<Counter handleCountDecrementClick={handleCountDecrementClick}
					         handleCountIncrementClick={handleCountIncrementClick}
					         count={quantity}
					         hideNull={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default CartProduct;