import React, {useState} from 'react';

import {ArrowPrev} from '../../assets/ArrowPrev';
import {ArrowNext} from '../../assets/ArrowNext';

import styles from './SliderCard.module.scss';
import SliderItem from "./SliderItem/SliderItem";

const SliderCard: React.FC<{images: string[]}> = ({images}) => {
	const [activeSlide, setActiveSlide] = useState(0);
	const [slidesValue, setSlidesValue] = useState({start: 0, end: 4});
	const [topSlides, setTopSlides] = useState(0);
	
	// стрелка вверх
	const handleClickArrowPrev = () => {
		if (slidesValue.start - 1 !== -1) {
			setSlidesValue(prev => ({ ...prev, start: prev.start - 1, end: prev.end - 1}));
			setTopSlides(prev => prev + 42);
		}
	};
	// стрелка вниз
	const handleClickArrowNext = () => {
		if (slidesValue.end + 1 <= images.length) {
			setSlidesValue(prev => ({ ...prev, start: prev.start + 1, end: prev.end + 1}));
			setTopSlides(prev => prev - 42);
		}
	};
	// клик по слайду
	const handleClickArrowSlide = (id: number) => {
		if (id !== activeSlide) {
			setActiveSlide(id);
		}
	};
	
	return (
		<div className={styles.cardSlider}>
			<div className={styles.cardSliderImages}>
				{images.length >= 4 &&
					<div style={slidesValue.start === 0 ? {opacity: "0.2", cursor: "default"} : {}}
					     onClick={handleClickArrowPrev}
					     className={styles.cardSliderArrowPrev}>
						<ArrowPrev/>
					</div>
				}
				<div className={styles.cardSliderSlidesContainer}>
					<div style={{top: `${topSlides}px`}} className={styles.cardSliderSlides}>
						{images.map((url, idx) =>
							<SliderItem
								key={idx}
								id={idx}
								activeSlide={activeSlide}
								imgUrl={url}
								handleClickArrowSlide={handleClickArrowSlide}
							/>,
						)}
					</div>
				</div>
				{images.length >= 4 &&
					<div style={slidesValue.end === images.length ? {opacity: "0.2", cursor: "default"} : {}}
					     onClick={handleClickArrowNext}
					     className={styles.cardSliderArrowNext}>
						<ArrowNext/>
					</div>
				}
			</div>
			<div className={styles.cardSliderImgHero}>
				<div className={styles.cardSliderImgHeroContainer}>
					<img src={images[activeSlide]} alt=""/>
				</div>
			</div>
		</div>
	);
};

export default SliderCard;