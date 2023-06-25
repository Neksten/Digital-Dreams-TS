import React from 'react';
import ContentLoader from 'react-content-loader';

const ContentLoaderCard: React.FC<{ length: number }> = ({length}) => {
	return (
		<>
			{[...Array(length)].map((i, idx) => (
				<div key={idx} className="loader">
					<ContentLoader
						speed={2}
						width={210}
						height={346}
						viewBox="0 0 210 346"
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb"
					>
						<rect x="15" y="165" rx="3" ry="3" width="70" height="18"/>
						<rect x="15" y="300" rx="8" ry="8" width="180" height="30"/>
						<rect x="38" y="10" rx="15" ry="15" width="134" height="140"/>
						<rect x="480" y="110" rx="5" ry="5" width="113" height="30"/>
						<rect x="15" y="188" rx="3" ry="3" width="50" height="13"/>
						<rect x="15" y="211" rx="3" ry="3" width="180" height="13"/>
						<rect x="15" y="228" rx="3" ry="3" width="130" height="13"/>
						<rect x="15" y="245" rx="3" ry="3" width="70" height="15"/>
					</ContentLoader>
				</div>
			))
			}
		</>
	);
};

export default ContentLoaderCard;