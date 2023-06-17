export interface ICartState {
	cart: ICartProduct[];
	finalPrice: number;
	finalSale: number;
	loading: boolean;
	error: string | null;
}
export interface ICartData {
	products: ICartProduct[];
	finalPrice: number;
	finalSale: number;
}
export interface ICartProduct {
	id: number;
	idProduct: number;
	retailPrice: number;
	discountPrice: number;
	quantity: number;
}

export enum CartActionTypes {
	AXIOS_CART = 'AXIOS_CART',
	AXIOS_CART_SUCCESS = 'AXIOS_CART_SUCCESS',
	AXIOS_CART_ERROR = 'AXIOS_CART_ERROR',
	CALCULATE_AMOUNT_CART = 'CALCULATE_AMOUNT_CART',
	ADD_CART = 'ADD_CART',
	REMOVE_CART = 'REMOVE_CART',
	ALL_REMOVE_CART = 'ALL_REMOVE_CART',
	UPDATE_COUNT_INCREMENT_CART = 'UPDATE_COUNT_INCREMENT_CART',
	UPDATE_COUNT_DECREMENT_CART = 'UPDATE_COUNT_DECREMENT_CART',
}

// запрос
export interface AxiosCartAction {
	type: CartActionTypes.AXIOS_CART
}
// если запрос успешен
export interface AxiosCartSuccessAction {
	type: CartActionTypes.AXIOS_CART_SUCCESS;
	payload: {
		products: ICartProduct[],
		finalPrice: number,
		finalSale: number
	};
}
// если произошла ошибка
export interface AxiosCartErrorAction {
	type: CartActionTypes.AXIOS_CART_ERROR;
	payload: string;
}
// посчитать итоговую сумму и скидку корзины
export interface CalculateAmountAction {
	type: CartActionTypes.CALCULATE_AMOUNT_CART;
	payload: {
		finalPrice: number,
		finalSale: number
	};
}
// добавить в корзину
export interface AddCartAction {
	type: CartActionTypes.ADD_CART;
	payload: ICartProduct;
}
// удалить из корзины
export interface RemoveCartAction {
	type: CartActionTypes.REMOVE_CART;
	payload: number;
}
// удалить всё из корзины
export interface AllRemoveCartAction {
	type: CartActionTypes.ALL_REMOVE_CART;
}
// увеличить количество
export interface UpdatedCountIncrementCartAction {
	type: CartActionTypes.UPDATE_COUNT_INCREMENT_CART;
	payload: number;
}
// уменьшить количество
export interface UpdatedCountDecrementCartAction {
	type: CartActionTypes.UPDATE_COUNT_DECREMENT_CART;
	payload: number;
}
export type CartAction =
	AxiosCartAction
	| AxiosCartSuccessAction
	| AxiosCartErrorAction
	| AddCartAction
	| RemoveCartAction
	| UpdatedCountIncrementCartAction
	| UpdatedCountDecrementCartAction
	| CalculateAmountAction
	| AllRemoveCartAction