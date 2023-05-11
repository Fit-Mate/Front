import React from "react";

/**
 *
 * @param {*} props : recommendationBody
 * @returns
 */
const SupplementHistory = (props) => {

	return (
		<Card>
			<div>
				<p>id: ${props.id}</p>
				<p>englishName: ${props.englishName}</p>
				<p>koreanName: ${props.koreanName}</p>
				<p>price: ${props.price}</p>
				<p>servings: ${props.servings}</p>
				<p>flavor: ${props.flavor}</p>
				<p>description: ${props.description}</p>
				<p>koreanRecommendation: ${props.koreanRecommendation}</p>
			</div>
		</Card>
	);

};

export default SupplementHistory;
