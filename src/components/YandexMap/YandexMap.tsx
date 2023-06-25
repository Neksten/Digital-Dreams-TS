import React, {useState} from 'react';
import {YMaps, Map} from '@pbe/react-yandex-maps';

import OutsideClickHandler from '../OutsideClickHandler';

import CustomInputForm from '../CustomInputForm/CustomInputForm';
import PointMap from '../PointMap';
import {Address} from '../../types/adress';

import styles from './YandexMap.module.scss';

interface IYandexMapProps {
	value: string;
	setValue: (value: string) => void;
	addresses: Address[];
}

const YandexMap: React.FC<IYandexMapProps> = ({value, setValue, addresses}) => {
	const [hideList, setHideList] = useState<boolean>(false);
	const [addressesList, setAddressesList] = useState<Address[]>(addresses);
	
	// клик по адресу
	function onClickItemList(address: string) {
		setValue(address);
	}
	
	// поиск по адресам
	function searchInput(valueInput: string) {
		setValue(valueInput);
		setAddressesList(addresses);
		if (valueInput) {
			setAddressesList(addresses.filter(i => i.address.toLowerCase().includes(value.toLowerCase())));
		}
		// при вводе валидного адреса с клавиатуры
		addressesList.some(i => i.address.toLowerCase().includes(value.toLowerCase()))
			? setHideList(true)
			: setHideList(false);
	}
	
	return (
		<div className={styles.map}>
			<CustomInputForm name={'Адрес'}
			                 htmlFor={'address'}
			                 value={value}
			                 setValue={searchInput}
			                 placeholder={'адрес'}
			                 handleClick={() => setHideList(true)}
			/>
			{hideList &&
				<OutsideClickHandler onOutsideClick={setHideList}>
					<div className={styles.addresses}>
						{addressesList.map(i => (
							<div key={i.address}
							     onClick={() => onClickItemList(i.address)}
							     className={styles.address}
							>
								{i.address}
							</div>
						))}
					</div>
				</OutsideClickHandler>
			}
			<YMaps
				query={{
					apikey: '2d5c5d27-f61a-4a85-9cab-db9cdfe57168',
				}}
			>
				<div className={styles.mapContainer}>
					<Map
						defaultState={{
							center: [54.319742, 48.395900],
							zoom: 15,
							controls: [],
						}}
						width="100%"
						height="500px"
					>
						{addresses.map((i, index) =>
							<PointMap key={index} geometry={i.geometry} address={i.address} setAddress={setValue}/>,
						)}
					</Map>
				</div>
			</YMaps>
		</div>
	);
};

export default YandexMap;
