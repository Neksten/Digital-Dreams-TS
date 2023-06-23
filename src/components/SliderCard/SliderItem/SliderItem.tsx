import React from 'react';

import styles from './SliderItem.module.scss';

interface SliderItemProps {
	imgUrl: string;
	id: number;
	activeSlide: number;
	handleClickArrowSlide: (id: number) => void;
}
const SliderItem: React.FC<SliderItemProps> = ({imgUrl, id, activeSlide, handleClickArrowSlide}) => {
	return (
		<div onClick={() => handleClickArrowSlide(id)}
		     className={`${styles.sliderItem} ${activeSlide === id && styles.active}`}>
			<img src={imgUrl} alt=""/>
		</div>
	);
};

export default SliderItem;