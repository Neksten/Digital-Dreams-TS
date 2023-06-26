import React, {useCallback} from 'react';

import {useDispatch} from 'react-redux';

import {useTypedSelector} from '../hooks/useTypedSelector';

import {
	addBrandFilterReducerAction,
	addColorFilterReducerAction, filterProductsReducerAction, removeBrandFilterReducerAction,
	removeColorFilterReducerAction,
} from '../store/reducers/productsReducer';

import {FilterOption} from '../types/filters';

import FilterDropDown from './FilterDropDown/FilterDropDown';


interface IFilterListProps {
	filters: FilterOption[];
}

const FilterList: React.FC<IFilterListProps> = ({filters}) => {
	const dispatch = useDispatch();
	const filtersActive = useTypedSelector(state => state.product.filters);
	
	// Добавить фильтр в активный
	const addOptionFilter = useCallback((option: string, title: string) => {
		switch (title) {
			case 'цвет':
				dispatch(addColorFilterReducerAction(option));
				break;
			case 'бренд':
				dispatch(addBrandFilterReducerAction(option));
		}
		dispatch(filterProductsReducerAction());
	}, []);
	
	// Убрать фильтр из активных
	const removeOptionFilter = useCallback((option: string, title: string) => {
		switch (title) {
			case 'цвет':
				dispatch(removeColorFilterReducerAction(option));
				break;
			case 'бренд':
				dispatch(removeBrandFilterReducerAction(option));
		}
		dispatch(filterProductsReducerAction());
	}, []);
	
	return (
		<>
			{filters.map((filter) => (
				<FilterDropDown selectedOptions={filtersActive}
				                addOptionFilter={addOptionFilter}
				                removeOptionFilter={removeOptionFilter}
				                key={filter.title}
				                title={filter.title}
				                list={filter.options}
				/>
			))}
		</>
	);
};

export default FilterList;