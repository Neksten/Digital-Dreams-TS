import {combineReducers} from 'redux';

import {productsReducer} from './productsReducer';
import {cartReducer} from './cartReducer';
import {favoriteReducer} from './favoriteReducer';


export const rootReducer = combineReducers({
	product: productsReducer,
	cart: cartReducer,
	favorite: favoriteReducer,
});

export type RootState = ReturnType<typeof rootReducer>