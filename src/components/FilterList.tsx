import React from 'react';
import FilterDropDown from "./FilterDropDown/FilterDropDown";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {
	addBrandFilterReducerAction,
	addColorFilterReducerAction, filterProductsReducerAction, removeBrandFilterReducerAction,
	removeColorFilterReducerAction
} from "../store/reducers/productsReducer";
import {useDispatch} from "react-redux";

interface IFilterListProps {
	filters: any[]
}

const FilterList: React.FC<IFilterListProps> = ({filters}) => {
	const dispatch = useDispatch()
	const filtersActive = useTypedSelector(state => state.product.filters)
	
	// Добавить фильтр в активный
	function addOptionFilter(option: string, title: string) {
		switch (title) {
			case 'цвет':
				dispatch(addColorFilterReducerAction(option))
				break
			case 'бренд':
				dispatch(addBrandFilterReducerAction(option))
		}
		dispatch(filterProductsReducerAction())
	}
	// Убрать фильтр из активных
	function removeOptionFilter(option: string, title: string) {
		switch (title) {
			case 'цвет':
				dispatch(removeColorFilterReducerAction(option))
				break
			case 'бренд':
				dispatch(removeBrandFilterReducerAction(option))
		}
		dispatch(filterProductsReducerAction())
	}
	
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