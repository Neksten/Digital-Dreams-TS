import {
	AddFavoriteAction,
	AxiosFavoriteAction, AxiosFavoriteErrorAction,
	AxiosFavoriteSuccessAction,
	FavoriteAction,
	FavoriteActionTypes, IFavoriteProduct,
	IFavoriteState, RemoveFavoriteAction,
} from '../../types/favorite';


const initialState: IFavoriteState = {
	favorites: [],
	loading: false,
	error: null,
};

export const favoriteReducer = (state: IFavoriteState = initialState, action: FavoriteAction) => {
		switch (action.type) {
			case FavoriteActionTypes.AXIOS_FAVORITE:
				return {...state, loading: true};
			case FavoriteActionTypes.AXIOS_FAVORITE_SUCCESS:
				return {...state, loading: false, favorites: action.payload};
			case FavoriteActionTypes.AXIOS_FAVORITE_ERROR:
				return {...state, loading: false, error: action.payload};
			case FavoriteActionTypes.ADD_FAVORITE:
				return {...state, loading: false, favorites: [...state.favorites, action.payload]};
			case FavoriteActionTypes.REMOVE_FAVORITE:
				return {...state,
					loading: false,
					favorites: [...state.favorites.filter(item => item.idProduct !== action.payload)],
				};
			default:
				return state;
		}
};

export const axiosFavoriteReducerAction = (): AxiosFavoriteAction => ({type: FavoriteActionTypes.AXIOS_FAVORITE});
export const axiosFavoriteSuccessReducerAction = (payload: IFavoriteProduct[]): AxiosFavoriteSuccessAction => ({
	type: FavoriteActionTypes.AXIOS_FAVORITE_SUCCESS, payload,
});
export const axiosFavoriteErrorReducerAction = (payload: string): AxiosFavoriteErrorAction => ({
	type: FavoriteActionTypes.AXIOS_FAVORITE_ERROR, payload,
});
export const addFavoriteReducerAction = (payload: IFavoriteProduct): AddFavoriteAction => ({
	type: FavoriteActionTypes.ADD_FAVORITE, payload,
});
export const removeFavoriteReducerAction = (payload: number): RemoveFavoriteAction => ({
	type: FavoriteActionTypes.REMOVE_FAVORITE, payload,
});
