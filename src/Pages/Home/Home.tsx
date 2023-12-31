import React, {useEffect, useRef, useState} from 'react';

import {useDispatch} from 'react-redux';

import {ArrowScroll} from '../../assets/ArrowScroll';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';
import Card from '../../components/Card/Card';
import DropDown from '../../components/DropDown/DropDown';
import FilterList from '../../components/FilterList';
import {
	ascendingPricesReducerAction,
	byNameFilterReducerAction,
	descendingPricesFilterReducerAction,
} from '../../store/reducers/productsReducer';
import {filtersList, sortedList} from '../../local-data';

import ContentLoaderCard from '../../components/ContentLoaderCard';

import styles from './Home.module.scss';

const Home: React.FC = () => {
	const dispatch = useDispatch();
	const {filteredProducts, loading} = useTypedSelector(state => state.product);
	const {axiosGetFavorite, axiosGetProducts, axiosGetCart} = useActions();
	const scrollToRef = useRef<HTMLElement>({} as HTMLElement);
	
	// сортировка
	const [sortedSelectionOption, setSortedSelectionOption] = useState<string>('По названию');
	
	// клик по стрелке до hero
	const handleClick = (): void => {
		scrollToRef.current?.scrollIntoView({behavior: 'smooth'});
	};
	
	// закрузка данных
	useEffect(() => {
		axiosGetFavorite();
		axiosGetProducts();
		axiosGetCart();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	// сортировка
	useEffect(() => {
		switch (sortedSelectionOption) {
			case 'По названию':
				dispatch(byNameFilterReducerAction());
				break;
			case 'По возрастанию цены':
				dispatch(descendingPricesFilterReducerAction());
				break;
			case 'По убыванию цены':
				dispatch(ascendingPricesReducerAction());
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortedSelectionOption, loading]);
	
	return (
		<main className={`page ${styles.home}`}>
			<section className={styles.hero}>
				<div className={`container ${styles.heroContainer}`}>
					<div className={styles.heroContent}>
						<h1 className={styles.heroTitle}>Digital Dreams</h1>
						<p className={styles.heroText}>Превращаем цифровые мечты в реальность</p>
						<span onClick={handleClick} className={styles.heroScroll}><ArrowScroll/></span>
					</div>
				</div>
			</section>
			<section ref={scrollToRef} className={styles.catalog}>
				<div className="container">
					<div className={styles.catalogContent}>
						<div className={styles.catalogTop}>
							<h3 className={styles.catalogTitle}>Каталог</h3>
							<div className={styles.catalogFilters}>
								<FilterList filters={filtersList}/>
								<DropDown list={sortedList} selectionOption={sortedSelectionOption}
								          setSelectionOption={setSortedSelectionOption}/>
							</div>
						</div>
						<div className={styles.catalogProducts}>
							{
								loading
									?
									<ContentLoaderCard length={10}/>
									:
									filteredProducts.map((product) => (
										<Card key={product.id} product={product}/>
									))
							}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Home;