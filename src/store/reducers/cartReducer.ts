import {
  AddCartAction, AllRemoveCartAction,
  AxiosCartAction,
  AxiosCartErrorAction,
  AxiosCartSuccessAction, CalculateAmountAction,
  CartAction,
  CartActionTypes,
  ICartProduct,
  ICartState,
  RemoveCartAction,
  UpdatedCountDecrementCartAction,
  UpdatedCountIncrementCartAction,
} from '../../types/cart';

const initialState: ICartState = {
  cart: [],
  finalPrice: 0,
  finalSale: 0,
  loading: false,
  error: null,
};

export const cartReducer = (state: ICartState = initialState, action: CartAction) => {
  switch (action.type) {
	case CartActionTypes.AXIOS_CART:
	  return {...state, loading: true}; // запрос
	case CartActionTypes.AXIOS_CART_SUCCESS:
	  return {
		...state,
		loading: false,
		cart: action.payload.products,
		finalPrice: action.payload.finalPrice,
		finalSale: action.payload.finalSale,
	  }; // получаем все товары из корзины
	case CartActionTypes.AXIOS_CART_ERROR:
	  return {...state, loading: false, error: action.payload}; // ошибка
	case CartActionTypes.CALCULATE_AMOUNT_CART:
	  return {
		...state,
		loading: false,
		finalPrice: action.payload.finalPrice,
		finalSale: action.payload.finalSale,
	  }; // поменять финальную цену и скидку
	case CartActionTypes.ADD_CART:
	  return {...state, loading: false, cart: [...state.cart, action.payload]}; // добавление товара в корзину
	case CartActionTypes.REMOVE_CART:
	  return {
		...state,
		loading: false,
		cart: state.cart.filter(item => item.idProduct !== action.payload),
	  }; // удаление товара из корзины
	case CartActionTypes.ALL_REMOVE_CART:
	  return {
		...state,
		loading: false,
		cart: [],
	  }; // очистка корзины
	case CartActionTypes.UPDATE_COUNT_INCREMENT_CART:
	  return {
		...state,
		loading: false,
		cart: state.cart.map(item =>
		  item.idProduct === action.payload
			? {...item, quantity: item.quantity + 1} // Увеличиваем quantity для указанного idProduct
			: item,
		),
	  };
	case CartActionTypes.UPDATE_COUNT_DECREMENT_CART:
	  return {
		...state,
		loading: false,
		cart: state.cart.map(item =>
		  item.idProduct === action.payload
			? {...item, quantity: item.quantity - 1} // Уменьшение quantity для указанного idProduct
			: item,
		),
	  };
	default:
	  return state;
  }
};

export const axiosCartReducerAction = (): AxiosCartAction => ({type: CartActionTypes.AXIOS_CART});
export const axiosCartSuccessReducerAction = (payload: {
  products: ICartProduct[],
  finalPrice: number,
  finalSale: number
}): AxiosCartSuccessAction => ({
  type: CartActionTypes.AXIOS_CART_SUCCESS, payload,
});
export const axiosCartErrorReducerAction = (payload: string): AxiosCartErrorAction => ({
  type: CartActionTypes.AXIOS_CART_ERROR, payload,
});
export const calculateAmountReducerAction = (payload: {
  finalPrice: number,
  finalSale: number
}): CalculateAmountAction => ({
  type: CartActionTypes.CALCULATE_AMOUNT_CART, payload,
});
export const addCartReducerAction = (payload: ICartProduct): AddCartAction => ({
  type: CartActionTypes.ADD_CART, payload,
});
export const removeCartReducerAction = (payload: number): RemoveCartAction => ({
  type: CartActionTypes.REMOVE_CART, payload,
});
export const allRemoveCartReducerAction = (): AllRemoveCartAction => ({
  type: CartActionTypes.ALL_REMOVE_CART,
});
export const updateCountCartIncrementReducerAction = (payload: number): UpdatedCountIncrementCartAction => ({
  type: CartActionTypes.UPDATE_COUNT_INCREMENT_CART, payload,
});
export const updateCountCartDecrementReducerAction = (payload: number): UpdatedCountDecrementCartAction => ({
  type: CartActionTypes.UPDATE_COUNT_DECREMENT_CART, payload,
});