import React, { useState, useEffect } from "react";
import Card from "../../../UI/Card";
import { userSupplementAPI } from "../../../API/API";

/**
 *
 * @param {*} props : recommendationBody
 * @returns
 */

const ShowIfNotBCAA = (props) => {
	const supplementInfo = props.supplementInfo;

	return (
		<div>
			<p>protienPerServing: {`${supplementInfo.proteinPerServing}`}</p>
			<p>fatPerServing: {`${supplementInfo.fatPerServing}`}</p>
			<p>carbohydratePerServing: {`${supplementInfo.carbohydratePerServing}`}</p>
			<p>source: {`${supplementInfo.source}`}</p>
		</div>
	);
}


/**Long id,
String englishName,
String koreanName,
Integer price,
Float servings,
String description,
String marketURL,
String supplementType
Float proteinPerServing,
Float fatPerServing,
Float carbohydratePerServing,
String source,
String flavor */

/**
 *
 * @param {*} props : props.history
 * @returns
 */

const SupplementHistory = (props) => {

	const [supplementInfo, setSupplementInfo] = useState({});
	const [supplementImage, setSupplementImage] = useState(null);

	/**function */
	const getSupplementInfo = async () => {
		const response = await userSupplementAPI.get(`/${props.history.id}`);
		const res = await userSupplementAPI.get(`/image/${props.history.id}`);
		let result = (res && res.data) || [];
		console.log(result);
		setSupplementInfo(response.data);
		setSupplementImage(result);

	}

	useEffect(()=>{
		getSupplementInfo();
	},[])

	return (
		<Card>
			<div>
				<div>
					<p>image</p>
					 <img src={`data:image/png;base64,${supplementImage}`} />
				</div>
				<p>id: {props.history.id}</p>
				<p>englishName: {props.history.englishName}</p>
				<p>koreanName: {props.history.koreanName}</p>
				<p>price: {props.history.price}</p>
				<p>servings: {props.history.servings}</p>
				<p>flavor: {props.history.flavor}</p>
				<p>marketURL: {supplementInfo.marketURL}</p>
				<p>description: {props.history.description}</p>
				{props.supplementType !== "BCAA" && <ShowIfNotBCAA supplementInfo={supplementInfo} />}
				<p></p>
				<p>koreanRecommendation: {props.history.koreanRecommendation}</p>
			</div>
		</Card>
	);

};

export default SupplementHistory;
