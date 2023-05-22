import React, { useState, useEffect } from "react";
import Card from "../../../UI/Card";
import { userSupplementAPI, userSupplementImageAPI } from "../../../API/API";
import classes from "./Histories.module.css";

import { Buffer } from "buffer";

import CustomTable from "../../../UI/CustomTable";
import { BsFillArrowDownSquareFill } from 'react-icons/bs';

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
	const [distilledInfo, setDistilledInfo] = useState({});
	const [supplementImage, setSupplementImage] = useState(null);

	/**function */
	const getSupplementInfo = async () => {
		const response = await userSupplementAPI.get(`/${props.history.id}`);
		const imageRes = await userSupplementImageAPI.get(`/image/${props.history.id}`);
		let result = (imageRes && imageRes.data) || [];
		setSupplementInfo(response.data);

		let base64ImageString = Buffer.from(imageRes.data, 'binary').toString('base64');
		let srcValue = `data:${imageRes.headers["Content-Type"]};base64,${base64ImageString}`;
		setSupplementImage(srcValue);
	}

	useEffect(() => {
		getSupplementInfo();
	}, [])

	useEffect(()=>{
		delete distilledInfo.id;
		delete distilledInfo.marketURL;
		setDistilledInfo(supplementInfo);
	}, [supplementInfo]);

	return (
		<Card>
			<div className={classes.CardContent}>
				<div>
					<p><BsFillArrowDownSquareFill />Click to go to transaction page<BsFillArrowDownSquareFill /></p>
					<a href={`${supplementInfo.marketURL}`}>
						<img src={supplementImage} />
					</a>
				</div>

				<div>
					{console.log(props.history)}
					{supplementInfo !== null && supplementInfo !== true && <CustomTable object={distilledInfo} />}
				</div>

				{/*<p>id: {props.history.id}</p>
				<p>englishName: {props.history.englishName}</p>
				<p>koreanName: {props.history.koreanName}</p>
				<p>price: {props.history.price}</p>
				<p>servings: {props.history.servings}</p>
				<p>flavor: {props.history.flavor}</p>
				<p>marketURL: <a href={props.history.marketURL}>URL</a></p>

				<p>description: {props.history.description}</p>
				{props.supplementType !== "BCAA" && <ShowIfNotBCAA supplementInfo={supplementInfo} />}*/}
				<div>
					<h3 className={classes.descriptionBorder}>KoreanRecommendation</h3>
					<p>{props.history.koreanRecommendation}</p>
				</div>
			</div>
		</Card>
	);

};

export default SupplementHistory;
