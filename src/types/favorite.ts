export interface IFavoriteState {
	favorites: IFavoriteProduct[];
	loading: boolean;
	error: string | null;
}
export interface IFavoriteProduct {
	id: number;
	idProduct: number;
}

export enum FavoriteActionTypes {
	AXIOS_FAVORITE = 'AXIOS_FAVORITE',
	AXIOS_FAVORITE_SUCCESS = 'AXIOS_FAVORITE_SUCCESS',
	AXIOS_FAVORITE_ERROR = 'AXIOS_FAVORITE_ERROR',
	ADD_FAVORITE = 'ADD_FAVORITE',
	REMOVE_FAVORITE = 'REMOVE_FAVORITE',
}

// запрос
export interface AxiosFavoriteAction {
	type: FavoriteActionTypes.AXIOS_FAVORITE;
}
// если запрос успешен
export interface AxiosFavoriteSuccessAction {
	type: FavoriteActionTypes.AXIOS_FAVORITE_SUCCESS;
	payload: IFavoriteProduct[];
}
// если произошла ошибка
export interface AxiosFavoriteErrorAction {
	type: FavoriteActionTypes.AXIOS_FAVORITE_ERROR;
	payload: string;
}
// добавить в избранное
export interface AddFavoriteAction {
	type: FavoriteActionTypes.ADD_FAVORITE;
	payload: IFavoriteProduct;
}
// удалить из избранного
export interface RemoveFavoriteAction {
	type: FavoriteActionTypes.REMOVE_FAVORITE;
	payload: number;
}

export type FavoriteAction =
	AxiosFavoriteAction
	| AxiosFavoriteSuccessAction
	| AxiosFavoriteErrorAction
	| AddFavoriteAction
	| RemoveFavoriteAction