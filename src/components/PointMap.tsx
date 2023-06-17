import React from 'react';
import {Placemark} from '@pbe/react-yandex-maps';

interface IPointMapProps {
	geometry: number[];
	address: string;
	setAddress: (value: string) => void;
}

const PointMap: React.FC<IPointMapProps> = ({geometry, address, setAddress}) => {
	return (
		<Placemark geometry={geometry} onClick={() => setAddress(address)}/>
	);
};

export default PointMap;