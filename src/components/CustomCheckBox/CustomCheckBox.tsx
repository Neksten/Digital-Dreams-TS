import React, {useEffect, useState} from 'react';
import './CustomCheckBox.scss';
import cn from 'classnames';

interface ICustomCheckBoxProps {
	activeParent: boolean;
}

const CustomCheckBox: React.FC<ICustomCheckBoxProps> = ({activeParent}) => {
	const [selected, setSelected] = useState<boolean>(false);
	
	// При клике на элемент CustomCheckBox
	const handleCheckBoxClick = ():void => {
		setSelected(!selected);
	};
	
	// если кликнули по родительскому элементу
	useEffect(() => {
		activeParent ? setSelected(true) : setSelected(false);
	}, [activeParent]);
	
	return (
		<div onClick={handleCheckBoxClick} className={cn('customCheckbox', {
			selected: selected,
		})}/>
	);
};

export default CustomCheckBox;