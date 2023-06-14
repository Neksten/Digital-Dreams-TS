import {
	AxiosProductsAction,
	AxiosProductsErrorAction,
	AxiosProductsSuccessAction,
	IProduct,
	ProductAction,
	ProductActionTypes,
	ProductsState,
} from '../../types/product';
import {
	AddBrandFilterAction,
	AddColorFilterAction,
	AscendingPricesAction,
	ByNameAction,
	DescendingPricesAction,
	FilteredProductsFilterAction,
	FiltersAction,
	FiltersActionTypes,
	RemoveBrandFilterAction,
	RemoveColorFilterAction,
} from '../../types/filters';

type AppAction = ProductAction | FiltersAction

const initialState: ProductsState = {
	products: [],
	filteredProducts: [],
	loading: false,
	error: null,
	filters: {
		brand: [],
		color: [],
		sortBy: null,
	},
};

export const productsReducer = (state = initialState, action: AppAction): ProductsState => {
	switch (action.type) {
		case ProductActionTypes.AXIOS_PRODUCTS:
			return {...state, loading: true};
		case ProductActionTypes.AXIOS_PRODUCTS_SUCCESS:
			return {
				...state,
				loading: false,
				filters: {...state.filters, brand: [], color: []},
				products: action.payload,
				filteredProducts: action.payload,
			};
		case ProductActionTypes.AXIOS_PRODUCTS_ERROR:
			return {...state, loading: false, error: action.payload};
		case FiltersActionTypes.BY_NAME:
			return {
				...state,
				filters: {...state.filters, sortBy: FiltersActionTypes.BY_NAME},
				filteredProducts: sortProductsByName(
					state.filteredProducts.length === 0 ? state.products : state.filteredProducts,
				),
			};
		case FiltersActionTypes.DESCENDING_PRICES:
			return {
				...state,
				filters: {...state.filters, sortBy: FiltersActionTypes.DESCENDING_PRICES},
				filteredProducts: sortProductsByDescendingPrices(state.filteredProducts),
			};
		case FiltersActionTypes.ASCENDING_PRICES:
			return {
				...state,
				filters: {...state.filters, sortBy: FiltersActionTypes.ASCENDING_PRICES},
				filteredProducts: sortProductsByAscendingPrices(state.filteredProducts),
			};
		case FiltersActionTypes.ADD_COLOR_FILTER:
			return {
				...state,
				filters: {
					...state.filters,
					color: [...state.filters.color, action.payload],
				},
			};
		case FiltersActionTypes.REMOVE_COLOR_FILTER:
			return {
				...state,
				filters: {
					...state.filters,
					color: state.filters.color.filter((brand) => brand !== action.payload),
				},
			};
		case FiltersActionTypes.ADD_BRAND_FILTER:
			return {
				...state,
				filters: {
					...state.filters,
					brand: [...state.filters.brand, action.payload],
				},
			};
		case FiltersActionTypes.REMOVE_BRAND_FILTER:
			return {
				...state,
				filters: {
					...state.filters,
					brand: state.filters.brand.filter((brand) => brand !== action.payload),
				},
			};
		case FiltersActionTypes.FILTERED_PRODUCTS:
			return {
				...state,
				filteredProducts: sortedSortBy(filterProducts(state.products, state.filters), state.filters.sortBy),
			};
		default:
			return state;
	}
};

// Action Creators
export const axiosProductsReducerAction = (): AxiosProductsAction => ({type: ProductActionTypes.AXIOS_PRODUCTS});
export const axiosProductsSuccessReducerAction = (payload: IProduct[]): AxiosProductsSuccessAction => ({
	type: ProductActionTypes.AXIOS_PRODUCTS_SUCCESS, payload,
});
export const axiosProductsErrorReducerAction = (payload: string): AxiosProductsErrorAction => ({
	type: ProductActionTypes.AXIOS_PRODUCTS_ERROR, payload,
});
export const byNameFilterReducerAction = () => <ByNameAction> ({
	type: FiltersActionTypes.BY_NAME,
});
export const descendingPricesFilterReducerAction = (): DescendingPricesAction => ({
	type: FiltersActionTypes.DESCENDING_PRICES,
});
export const ascendingPricesReducerAction = (): AscendingPricesAction => ({
	type: FiltersActionTypes.ASCENDING_PRICES,
});
export const addColorFilterReducerAction = (payload: string): AddColorFilterAction => ({
	type: FiltersActionTypes.ADD_COLOR_FILTER, payload,
});
export const removeColorFilterReducerAction = (payload: string): RemoveColorFilterAction => ({
	type: FiltersActionTypes.REMOVE_COLOR_FILTER, payload,
});
export const addBrandFilterReducerAction = (payload: string): AddBrandFilterAction => ({
	type: FiltersActionTypes.ADD_BRAND_FILTER, payload,
});
export const removeBrandFilterReducerAction = (payload: string): RemoveBrandFilterAction => ({
	type: FiltersActionTypes.REMOVE_BRAND_FILTER, payload,
});
export const filterProductsReducerAction = (): FilteredProductsFilterAction => ({
	type: FiltersActionTypes.FILTERED_PRODUCTS,
});

// Варианты сортировки
const sortProductsByName = (products: IProduct[]): IProduct[] => {
	return [...products].sort((a, b) => a.title.localeCompare(b.title));
};
const sortProductsByDescendingPrices = (products: IProduct[]): IProduct[] => {
	return [...products].sort((a, b) => a.discountPrice - b.discountPrice);
};
const sortProductsByAscendingPrices = (products: IProduct[]): IProduct[] => {
	return [...products].sort((a, b) => b.discountPrice - a.discountPrice);
};
const sortedSortBy = (products: IProduct[], sortBy: string | null): IProduct[] => {
	if (!sortBy) {
		return products;
	}
	switch (sortBy) {
		case FiltersActionTypes.BY_NAME:
			return sortProductsByName(products);
		case FiltersActionTypes.DESCENDING_PRICES:
			return sortProductsByDescendingPrices(products);
		case FiltersActionTypes.ASCENDING_PRICES:
			return sortProductsByAscendingPrices(products);
		default:
			return products;
	}
};

// Функция фильтрации
const filterProducts = (products: IProduct[], filters: ProductsState['filters']): IProduct[] => {
	return products.filter((product) => {
		for (const filterName in filters) {
			if (filterName === 'brand' || filterName === 'color') {
				const filterValues = filters[filterName];
				if (
					filterValues.length > 0 &&
					!filterValues.includes((product[filterName as keyof IProduct] as string).toLowerCase())
				) {
					return false;
				}
			}
		}
		return true;
	});
};