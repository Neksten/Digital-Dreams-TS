import React, {useEffect, useState} from 'react';
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";

interface IFilterDropDownItemProps {
	option: string;
	addOptionFilter: (option: string, title: string) => void;
	selectedOptions: any;
	removeOptionFilter: any;
	title: any;
}

const FilterDropDownItem: React.FC <IFilterDropDownItemProps> = ({option, addOptionFilter, removeOptionFilter, selectedOptions, title}) => {
	const [selected, setSelected] = useState(false)
	
	// активный/неактивный
	function handleOptionClick() {
		setSelected(!selected)
		
		if (selected) {
			removeOptionFilter(option.toLowerCase(), title.toLowerCase())
			
		} else {
			addOptionFilter(option.toLowerCase(), title.toLowerCase())
		}
	}
	
	useEffect(() => {
		if (selectedOptions.brand.includes(option.toLowerCase())
			|| selectedOptions.color.includes(option.toLowerCase())
		) {
			setSelected(true)
		}
	}, [])
	
	return (
		<li onClick={handleOptionClick}>
			<CustomCheckBox activeParent={selected}/>
			<span>{option}</span>
		</li>
	);
};

export default FilterDropDownItem;