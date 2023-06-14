import {Dispatch} from 'redux';

import {IProduct, ProductAction} from '../../types/product';
import {
	axiosProductsErrorReducerAction,
	axiosProductsReducerAction,
	axiosProductsSuccessReducerAction,
} from '../reducers/productsReducer';

export const axiosGetProducts = () => {
	return async (dispatch: Dispatch<ProductAction>) => {
		try {
			// получаем данные(загрузка)
			dispatch(axiosProductsReducerAction());
			const products = await localStorage.getItem('products');
			const response: IProduct[] = products ? JSON.parse(products) : null;
			dispatch(axiosProductsSuccessReducerAction(response));
		} catch (e) {
			dispatch(axiosProductsErrorReducerAction('Ошибка при загрузке товаров'));
		}
	};
};
