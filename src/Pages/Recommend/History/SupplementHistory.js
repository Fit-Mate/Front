import React from "react";
import Card from "../../../UI/Card";

/**
 *
 * @param {*} props : recommendationBody
 * @returns
 */
const SupplementHistory = (props) => {

	return (
		<Card>
			<div>
				<p>id: {props.history.id}</p>
				<p>englishName: {props.history.englishName}</p>
				<p>koreanName: {props.history.koreanName}</p>
				<p>price: {props.history.price}</p>
				<p>servings: {props.history.servings}</p>
				<p>flavor: {props.history.flavor}</p>
				<p>description: {props.history.description}</p>
				<p>koreanRecommendation: {props.history.koreanRecommendation}</p>
			</div>
		</Card>
	);

};

export default SupplementHistory;
