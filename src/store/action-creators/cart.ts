import {Dispatch} from 'redux';

import {CartAction, ICartData, ICartProduct} from '../../types/cart';
import {IProduct} from '../../types/product';
import {
  addCartReducerAction, allRemoveCartReducerAction, axiosCartErrorReducerAction,
  axiosCartReducerAction,
  axiosCartSuccessReducerAction, calculateAmountReducerAction,
  removeCartReducerAction, updateCountCartDecrementReducerAction, updateCountCartIncrementReducerAction,
} from '../reducers/cartReducer';

// get запрос с будущего бэка
export const axiosGetCart = () => {
  return async (dispatch: Dispatch<CartAction>) => {
	try {
	  // получаем данные(загрузка)
	  dispatch(axiosCartReducerAction());
	  const cart = await localStorage.getItem('cart');
	  const {products, finalSale, finalPrice}: ICartData = cart ? JSON.parse(cart) : null;
	  
	  setTimeout(() => {
		dispatch(axiosCartSuccessReducerAction({products, finalPrice, finalSale}));
	  }, 600);
	} catch (e) {
	  dispatch(axiosCartErrorReducerAction('Ошибка при загрузке товаров'));
	}
  };
};

// post запрос добавления в корзину на будущий бэк
export const addCart = (product: IProduct) => {
  return async (dispatch: Dispatch<CartAction>) => {
	try {
	  // загрузка
	  dispatch(axiosCartReducerAction());
	  const cart = await localStorage.getItem('cart');
	  const {products, finalPrice, finalSale}: ICartData = cart ? JSON.parse(cart) : null;
	  const {id, retailPrice, discountPrice} = product;
	  
	  const price: number = finalPrice + discountPrice;
	  const sale: number = finalSale + ((retailPrice || 0) ? ((retailPrice || 0) - discountPrice) : 0);
	  
	  // новый элемент
	  const newProduct = <ICartProduct>{
		id: Date.now(),
		idProduct: id,
		retailPrice: retailPrice || 0,
		discountPrice: discountPrice,
		quantity: 1,
	  };
	  // корина с новым элементом
	  const updatedCart: ICartData = {
		finalPrice: price,
		finalSale: sale,
		products: [newProduct, ...products],
	  };
	  
	  await localStorage.setItem('cart', JSON.stringify(updatedCart));
	  dispatch(calculateAmountReducerAction({finalPrice: price, finalSale: sale}));
	  dispatch(addCartReducerAction(newProduct));
	} catch (e) {
	  dispatch(axiosCartErrorReducerAction('Ошибка при добавление товара'));
	}
  };
};

// delete запрос удаления из корзины на будущем бэке
export const removeCart = (id: number) => {
  return async (dispatch: Dispatch<CartAction>) => {
	try {
	  // загрузка
	  dispatch(axiosCartReducerAction());
	  const cart = await localStorage.getItem('cart');
	  const {products, finalPrice, finalSale}: ICartData = cart ? JSON.parse(cart) : null;
	  const product: ICartProduct | undefined = products.find((i) => i.idProduct === id);
	  
	  if (product) {
		const {retailPrice, discountPrice, quantity} = product;
		
		const price: number = finalPrice - (discountPrice * quantity);
		const sale: number = finalSale - (
		  (retailPrice || 0) ? (((retailPrice || 0) - discountPrice) * quantity) : 0);
		
		const updatedCart: ICartData = {
		  finalPrice: price,
		  finalSale: sale,
		  products: products.filter((i: ICartProduct) => i.idProduct !== id),
		};
		
		await localStorage.setItem('cart', JSON.stringify(updatedCart));
		dispatch(calculateAmountReducerAction({finalPrice: price, finalSale: sale}));
		dispatch(removeCartReducerAction(id));
	  }
	} catch (e) {
	  dispatch(axiosCartErrorReducerAction('Ошибка при удаление товара'));
	}
  };
};
// delete запрос удаление корзины на будущем бэке
export const allRemoveCart = () => {
  return async (dispatch: Dispatch<CartAction>) => {
	try {
	  // загрузка
	  dispatch(axiosCartReducerAction());
	  
	  await localStorage.setItem('cart', JSON.stringify({products: [], finalPrice: 0, finalSale: 0}));
	  
	  dispatch(allRemoveCartReducerAction());
	} catch (e) {
	  dispatch(axiosCartErrorReducerAction('Ошибка при удаление товара'));
	}
  };
};

// post запрос с изменением count++ на будущем бэке
export const productCountIncrementClick = (id: number) => {
  return async (dispatch: Dispatch<CartAction>) => {
	try {
	  // загрузка
	  dispatch(axiosCartReducerAction());
	  const cart = await localStorage.getItem('cart');
	  const {products, finalPrice, finalSale}: ICartData = cart ? JSON.parse(cart) : null;
	  const product: ICartProduct | undefined = products.find((i) => i.idProduct === id);
	  
	  if (product) {
		const {retailPrice, discountPrice} = product;
		
		const price: number = finalPrice + discountPrice;
		const sale: number = finalSale + ((retailPrice || 0) ? ((retailPrice || 0) - discountPrice) : 0);
		
		const updatedCart: ICartData = {
		  products: products.map((i: ICartProduct) => i.idProduct === id
			? {...i, quantity: i.quantity + 1}
			: i,
		  ),
		  finalPrice: price,
		  finalSale: sale,
		};
		
		await localStorage.setItem('cart', JSON.stringify(updatedCart));
		dispatch(calculateAmountReducerAction({finalPrice: price, finalSale: sale}));
		dispatch(updateCountCartIncrementReducerAction(id));
	  }
	} catch (e) {
	  dispatch(axiosCartErrorReducerAction('Ошибка при увеличение количества товара'));
	}
  };
};

// post запрос с изменением count++ на будущем бэке
export const productCountDecrementClick = (id: number) => {
  return async (dispatch: Dispatch<CartAction>) => {
	try {
	  // загрузка
	  dispatch(axiosCartReducerAction());
	  const cart = await localStorage.getItem('cart');
	  const {products, finalPrice, finalSale}: ICartData = cart ? JSON.parse(cart) : null;
	  const product: ICartProduct | undefined = products.find((i) => i.idProduct === id);
	  
	  if (product) {
		const {retailPrice, discountPrice} = product;
		
		const price: number = finalPrice - discountPrice;
		const sale: number = finalSale - ((retailPrice || 0) ? ((retailPrice || 0) - discountPrice) : 0);
		
		const updatedCart: ICartData = {
		  products: products.map((i: ICartProduct) => i.idProduct === id
			? {...i, quantity: i.quantity - 1}
			: i,
		  ),
		  finalPrice: price,
		  finalSale: sale,
		};
		
		await localStorage.setItem('cart', JSON.stringify(updatedCart));
		dispatch(calculateAmountReducerAction({finalPrice: price, finalSale: sale}));
		dispatch(updateCountCartDecrementReducerAction(id));
	  }
	} catch (e) {
	  dispatch(axiosCartErrorReducerAction('Ошибка при увеличение количества товара'));
	}
  };
};