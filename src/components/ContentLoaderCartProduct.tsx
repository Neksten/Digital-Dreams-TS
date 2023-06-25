import React from 'react';
import ContentLoader from 'react-content-loader';

const ContentLoaderCartProduct: React.FC<{ length: number }> = ({length}) => {
	return (
		<>
			{[...Array(length)].map((i, idx) => (
				<div key={idx} className="loader">
					<ContentLoader
						speed={2}
						width={670}
						height={143}
						viewBox="0 0 670 143"
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb"
					>
						<rect x="18" y="18" rx="15" ry="15" width="110" height="110"/>
						<rect x="150" y="18" rx="5" ry="5" width="205" height="17"/>
						<rect x="150" y="44" rx="5" ry="5" width="110" height="17"/>
						<rect x="150" y="86" rx="5" ry="5" width="60" height="17"/>
						<rect x="150" y="111" rx="5" ry="5" width="80" height="17"/>
						<rect x="525" y="18" rx="5" ry="5" width="70" height="20"/>
						<rect x="525" y="44" rx="5" ry="5" width="45" height="12"/>
						<rect x="525" y="98" rx="5" ry="5" width="130" height="30"/>
					</ContentLoader>
				</div>
			))
			}
		</>
	);
};

export default ContentLoaderCartProduct;