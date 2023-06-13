import {combineReducers} from "redux";
import {productsReducer} from "./productsReducer";
import {cartReducer} from "./cartReducer";


export const rootReducer = combineReducers({
	product: productsReducer,
	cart: cartReducer,
})

export type RootState = ReturnType<typeof rootReducer>