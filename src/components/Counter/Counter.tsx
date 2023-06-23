import React from 'react';

import classNames from 'classnames/bind';

import styles from './Counter.module.scss';

const cx = classNames.bind(styles);

interface ICounterProps {
	handleCountDecrementClick: () => void;
	handleCountIncrementClick: () => void;
	count: number;
	hideNull?: boolean;
	height?: string | undefined;
}

const Counter: React.FC<ICounterProps> = (
	{
		handleCountDecrementClick,
		handleCountIncrementClick,
		count,
		hideNull,
		height = '30px',
	}) => {
	return (
		<div style={height ? {height, lineHeight: height} : {}} className={styles.cardCounter}>
			<span onClick={handleCountDecrementClick} className={cx(`${styles.decrement}`, {
				hide: hideNull && count === 1,
			})}>-</span>
			<span className={styles.count}>{count}</span>
			<span onClick={handleCountIncrementClick} className={styles.increment}>+</span>
		</div>
	);
};

export default Counter;