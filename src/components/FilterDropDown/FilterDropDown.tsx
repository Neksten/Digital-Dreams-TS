import React, {useState} from 'react';

import OutsideClickHandler from '../OutsideClickHandler';

import {ArrowDown} from '../../assets/ArrowDown';

import {IFiltersState} from '../../types/filters';

import styles from './FilterDropDown.module.scss';
import FilterDropDownItem from './FilterDropDownItem';

interface IFilterDropDownProps {
	addOptionFilter: (option: string, title: string) => void;
	selectedOptions: IFiltersState;
	removeOptionFilter: (option: string, title: string) => void;
	title: string;
	list: string[];
}

const FilterDropDown: React.FC<IFilterDropDownProps> = (props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const options = props.list;
	
	// открытие/закрытие
	function toggleDropdown() {
		setIsOpen(!isOpen);
	}
	
	return (
		<div className={styles.filterDropdown}>
			<OutsideClickHandler onOutsideClick={setIsOpen}>
				<div onClick={toggleDropdown} className={styles.top}>{props.title} <span><ArrowDown/></span></div>
				{isOpen &&
					<div className={styles.body}>
						<ul>
							{options.map((option => (
								<FilterDropDownItem selectedOptions={props.selectedOptions}
								                    addOptionFilter={props.addOptionFilter}
								                    removeOptionFilter={props.removeOptionFilter}
								                    key={option}
								                    option={option}
								                    title={props.title}
								/>
							)))}
						</ul>
					</div>
				}
			</OutsideClickHandler>
		</div>
	);
};

export default FilterDropDown;