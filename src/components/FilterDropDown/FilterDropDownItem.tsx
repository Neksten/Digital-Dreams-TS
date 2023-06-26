import React, {useEffect, useState} from 'react';

import CustomCheckBox from '../CustomCheckBox/CustomCheckBox';
import {IFiltersState} from '../../types/filters';

interface IFilterDropDownItemProps {
	option: string;
	addOptionFilter: (option: string, title: string) => void;
	selectedOptions: IFiltersState;
	removeOptionFilter: (option: string, title: string) => void;
	title: string;
}

const FilterDropDownItem: React.FC<IFilterDropDownItemProps> = (
	{
		option,
		addOptionFilter,
		removeOptionFilter,
		selectedOptions,
		title,
	}) => {
	const [selected, setSelected] = useState<boolean>(false);
	
	// активный/неактивный
	const handleOptionClick = () => {
		setSelected(!selected);
		
		if (selected) {
			removeOptionFilter(option.toLowerCase(), title.toLowerCase());
			
		} else {
			addOptionFilter(option.toLowerCase(), title.toLowerCase());
		}
	};
	
	useEffect(() => {
		if (selectedOptions.brand.includes(option.toLowerCase())
			|| selectedOptions.color.includes(option.toLowerCase())
		) {
			setSelected(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return (
		<li onClick={handleOptionClick}>
			<CustomCheckBox activeParent={selected}/>
			<span>{option}</span>
		</li>
	);
};

export default FilterDropDownItem;