import {Dispatch} from 'redux';

import {FavoriteAction, IFavoriteProduct} from '../../types/favorite';
import {
	addFavoriteReducerAction,
	axiosFavoriteErrorReducerAction,
	axiosFavoriteReducerAction,
	axiosFavoriteSuccessReducerAction, removeFavoriteReducerAction,
} from '../reducers/favoriteReducer';
import {IProduct} from '../../types/product';

// get запрос с будущего бэка
export const axiosGetFavorite = () => {
	return async (dispatch: Dispatch<FavoriteAction>) => {
		try {
			// получаем данные(загрузка)
			dispatch(axiosFavoriteReducerAction());
			const response = await localStorage.getItem('favorite');
			const favorite: IFavoriteProduct[] = response ? JSON.parse(response) : null;
			
			dispatch(axiosFavoriteSuccessReducerAction(favorite));
		}	catch (e) {
			dispatch(axiosFavoriteErrorReducerAction('Ошибка при загрузке избранных'));
		}
	};
};
// post запрос добавления в избранное на будущий бэк
export const addFavorite = (product: IProduct) => {
	return async (dispatch: Dispatch<FavoriteAction>) => {
		try {
			// получаем данные(загрузка)
			dispatch(axiosFavoriteReducerAction());
			const response = await localStorage.getItem('favorite');
			const favorite: IFavoriteProduct[] = response ? JSON.parse(response) : null;
			
			const newProduct: IFavoriteProduct = {
				id: Date.now(),
				idProduct: product.id,
			};
			
			const updatedFavorite:IFavoriteProduct[] = [...favorite, newProduct];
			await localStorage.setItem('favorite', JSON.stringify(updatedFavorite));
			dispatch(addFavoriteReducerAction(newProduct));
		}	catch (e) {
			dispatch(axiosFavoriteErrorReducerAction('Ошибка при добавление в избранное'));
		}
	};
};
// delete запрос удаления из избранного на будущем бэке
export const removeFavorite = (id: number) => {
	return async (dispatch: Dispatch<FavoriteAction>) => {
		try {
			// получаем данные(загрузка)
			dispatch(axiosFavoriteReducerAction());
			const response = await localStorage.getItem('favorite');
			const favorite: IFavoriteProduct[] = response ? JSON.parse(response) : null;
			
			const updatedFavorite: IFavoriteProduct[] =  [...favorite.filter(i => i.idProduct !== id)];
			
			await localStorage.setItem('favorite', JSON.stringify(updatedFavorite));
			dispatch(removeFavoriteReducerAction(id));
		}	catch (e) {
			dispatch(axiosFavoriteErrorReducerAction('Ошибка при удаление из избранного'));
		}
	};
};