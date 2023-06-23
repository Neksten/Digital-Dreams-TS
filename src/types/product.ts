import {IFiltersState} from './filters';
import {IReview} from "./review";

export interface ProductsState {
	products: IProduct[];
	filteredProducts: IProduct[];
	loading: boolean;
	error: string | null;
	filters: IFiltersState;
}

export interface IProduct {
	id: number;
	title: string;
	retailPrice?: number | null;
	description: string;
	discountPrice: number;
	brand: string;
	color: string
	images: string[];
	reviews: IReview[];
}

export enum ProductActionTypes {
	AXIOS_PRODUCTS = 'AXIOS_PRODUCTS',
	AXIOS_PRODUCTS_SUCCESS = 'AXIOS_USERS_SUCCESS',
	AXIOS_PRODUCTS_ERROR = 'AXIOS_USERS_ERROR',
}

// запрос
export interface AxiosProductsAction {
	type: ProductActionTypes.AXIOS_PRODUCTS;
}
// если запрос успешен
export interface AxiosProductsSuccessAction {
	type: ProductActionTypes.AXIOS_PRODUCTS_SUCCESS;
	payload: IProduct[];
}
// если произошла ошибка
export interface AxiosProductsErrorAction {
	type: ProductActionTypes.AXIOS_PRODUCTS_ERROR;
	payload: string;
}
export type ProductAction =
	AxiosProductsAction
	| AxiosProductsSuccessAction
	| AxiosProductsErrorAction