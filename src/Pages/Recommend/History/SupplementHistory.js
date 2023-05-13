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
				<p>id: ${props.recommendationBody.id}</p>
				<p>englishName: ${props.recommendationBody.englishName}</p>
				<p>koreanName: ${props.recommendationBody.koreanName}</p>
				<p>price: ${props.recommendationBody.price}</p>
				<p>servings: ${props.recommendationBody.servings}</p>
				<p>flavor: ${props.recommendationBody.flavor}</p>
				<p>description: ${props.recommendationBody.description}</p>
				<p>koreanRecommendation: ${props.recommendationBody.koreanRecommendation}</p>
			</div>
		</Card>
	);

};

export default SupplementHistory;
