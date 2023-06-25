import React from 'react';

export const Star: React.FC<{ color?: string }> = ({color = '#FF9518'}) => (
	<svg width="322" height="306" viewBox="0 0 322 306" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d={'M161 0L198.943 116.776H321.729L222.393 188.948L260.336 305.724L161 233.552L61.' +
			'6643 305.724L99.6072 188.948L0.271454 116.776H123.057L161 0Z'}
		      fill={color}/>
	</svg>
);