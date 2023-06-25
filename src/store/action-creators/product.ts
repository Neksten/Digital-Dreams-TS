import {Dispatch} from 'redux';

import {AddReviewActionPayload, IProduct, ProductAction} from '../../types/product';
import {
  addReviewReducerAction,
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
	  setTimeout(() => {
		dispatch(axiosProductsSuccessReducerAction(response));
	  }, 500);
	} catch (e) {
	  dispatch(axiosProductsErrorReducerAction('Ошибка при загрузке товаров'));
	}
  };
};

export const addReview = ({idProduct, review}: AddReviewActionPayload) => {
  return async (dispatch: Dispatch<ProductAction>) => {
	try {
	  // получаем данные(загрузка)
	  dispatch(axiosProductsReducerAction());
	  const products = await localStorage.getItem('products');
	  const response: IProduct[] = products ? JSON.parse(products) : null;
	  
	  const updatedProducts: IProduct[] = [...response].map((i): IProduct => {
		if (i.id === idProduct) {
		  return {...i, reviews: [review, ...i.reviews]};
		}
		return i;
	  });
	  
	  await localStorage.setItem('products', JSON.stringify(updatedProducts));
	  dispatch(addReviewReducerAction({idProduct, review}));
	  dispatch(axiosProductsSuccessReducerAction(updatedProducts));
	} catch (e) {
	  dispatch(axiosProductsErrorReducerAction('Ошибка при загрузке товаров'));
	}
  };
};
