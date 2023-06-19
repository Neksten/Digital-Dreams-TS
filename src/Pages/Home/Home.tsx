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

import styles from './Home.module.scss';
import ContentLoader from "react-content-loader";

const Home: React.FC = () => {
	const dispatch = useDispatch();
	const {filteredProducts, loading} = useTypedSelector(state => state.product);
	const {axiosGetFavorite, axiosGetProducts, axiosGetCart} = useActions();
	const scrollToRef = useRef<HTMLElement>({} as HTMLElement);
	
	// сортировка
	const [sortedSelectionOption, setSortedSelectionOption] = useState('По названию');
	
	// клик по стрелке до hero
	function handleClick(): void {
		scrollToRef.current?.scrollIntoView({behavior: 'smooth'});
	}
	
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
									[...Array(10)].map((i, idx) => (
										<div key={idx} className="loader">
											<ContentLoader
												speed={2}
												width={210}
												height={320}
												viewBox="0 0 210 320"
												backgroundColor="#f3f3f3"
												foregroundColor="#ecebeb"
											>
												<rect x="15" y="173" rx="3" ry="3" width="70" height="16" />
												<rect x="15" y="280" rx="8" ry="8" width="180" height="30" />
												<rect x="38" y="10" rx="15" ry="15" width="134" height="140" />
												<rect x="480" y="30" rx="5" ry="5" width="70" height="20" />
												<rect x="480" y="56" rx="5" ry="5" width="45" height="12" />
												<rect x="480" y="110" rx="5" ry="5" width="113" height="30" />
												<rect x="15" y="196" rx="3" ry="3" width="50" height="10" />
												<rect x="15" y="227" rx="3" ry="3" width="180" height="15" />
												<rect x="15" y="248" rx="3" ry="3" width="130" height="15" />
											</ContentLoader>
										</div>
									))
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