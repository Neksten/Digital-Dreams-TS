export interface IFiltersState {
	brand: string[],
	color: string[]
	sortBy: string | null;
}

export enum FiltersActionTypes {
	BY_NAME = 'BY_NAME',
	DESCENDING_PRICES = 'DESCENDING_PRICES',
	ASCENDING_PRICES = 'ASCENDING_PRICES',
	ADD_COLOR_FILTER = 'ADD_COLOR_FILTER',
	ADD_BRAND_FILTER = 'ADD_BRAND_FILTER',
	REMOVE_COLOR_FILTER = 'REMOVE_COLOR_FILTER',
	REMOVE_BRAND_FILTER = 'REMOVE_BRAND_FILTER',
	FILTERED_PRODUCTS = 'FILTERED_PRODUCTS'
}

// сортировка по названию
export interface ByNameAction {
	type: FiltersActionTypes.BY_NAME;
}
// сортировка по названию
export interface DescendingPricesAction {
	type: FiltersActionTypes.DESCENDING_PRICES;
}
// сортировка по названию
export interface AscendingPricesAction {
	type: FiltersActionTypes.ASCENDING_PRICES;
}
export interface AddColorFilterAction {
	type: FiltersActionTypes.ADD_COLOR_FILTER,
	payload: string
}
export interface RemoveColorFilterAction {
	type: FiltersActionTypes.REMOVE_COLOR_FILTER,
	payload: string
}
export interface AddBrandFilterAction {
	type: FiltersActionTypes.ADD_BRAND_FILTER,
	payload: string
}
export interface RemoveBrandFilterAction {
	type: FiltersActionTypes.REMOVE_BRAND_FILTER,
	payload: string
}
export interface FilteredProductsFilterAction {
	type: FiltersActionTypes.FILTERED_PRODUCTS
}

export type FiltersAction =
	ByNameAction
	| DescendingPricesAction
	| AscendingPricesAction
	| AddColorFilterAction
	| AddBrandFilterAction
	| RemoveColorFilterAction
	| RemoveBrandFilterAction
	| FilteredProductsFilterAction