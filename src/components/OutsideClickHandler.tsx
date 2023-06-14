import React, {useEffect, useRef} from 'react';

interface IOutsideClickHandlerProps {
	onOutsideClick: (value: boolean) => void;
	children?: React.ReactNode;
}

// Выполнит onOutsideClick если клик произошел вне элемента
const OutsideClickHandler: React.FC<IOutsideClickHandlerProps> = ({ onOutsideClick, children }) => {
	const ref = useRef<HTMLDivElement>({} as HTMLDivElement);
	
	useEffect(() => {
		function handleClickOutside(event: MouseEvent | TouchEvent) {
			// если клик произошел вне dropdown, то закрыть его
			if (ref.current && event.target && !ref.current.contains(event.target as Node)) {
				onOutsideClick(false);
			}
		}
		
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return <div ref={ref}>{children}</div>;
};

export default OutsideClickHandler;