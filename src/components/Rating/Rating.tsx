import React, {useState} from 'react';

import {Star} from '../../assets/Star';

import styles from './Rating.module.scss';

interface IRatingProps {
	setRating: (value: number) => void;
}

const Rating: React.FC<IRatingProps> = ({setRating}) => {
	const [hideStars, setHideStars] = useState<number>(5);
	
	function handleClickStar(index: number): void {
		setHideStars(index);
		setRating(index + 1);
	}
	
	return (
		<div className={styles.rating}>
			<div className={styles.stars}>
				{[...Array(5)].map((i, idx) => (
					<div key={idx} onClick={() => handleClickStar(idx)} className={styles.star}>
						{idx <= hideStars
							?
							<Star/>
							:
							<Star color={'#686868'}/>
						}
					</div>
				))}
			</div>
			<span>- Ваша оценка</span>
		</div>
	);
};

export default Rating;