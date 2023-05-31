import React, { useState } from "react";
import { bodyDataPostAPI } from "../../API/API";
import Button from "../../UI/Button";
import Card from "../../UI/Card";

import classes from "./MemberBodyDataSummary.module.css";
/**
 *
 * @param {*} props : setIsAddClicked={setIsAddClicked}
 * @returns
 */
const MemberBodyDataAdd = (props) => {

	/**state */
	const [bodyDataDate, setBodyDataDate] = useState("2023-01-01");
	const [bodyDataHeight, setBodyDataHeight] = useState(60.0);
	const [bodyDataWeight, setBodyDataWeight] = useState(60.0);
	const [bodyDataUpperBodyFat, setBodyDataUpperBodyFat] = useState(18);
	const [bodyDataLowerBodyFat, setBodyDataLowerBodyFat] = useState(18);
	const [bodyDataUpperMuscleMass, setBodyDataUpperMuscleMass] = useState(18);
	const [bodyDataLowerMuscleMass, setBodyDataLowerMuscleMass] = useState(18);

	/**function */
	const clearBodyDataForm = () => {
		setBodyDataDate((prev) => {
			const dateObj = new Date(prev);
			dateObj.setDate(dateObj.getDate() + 1);
			const year = dateObj.getFullYear();
			const month = dateObj.getMonth() + 1;
			const date = dateObj.getDate();

			return (`${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`);
		})
		setBodyDataWeight(60.0);
		setBodyDataHeight(60.0);
		setBodyDataUpperBodyFat(18);
		setBodyDataLowerBodyFat(18);
		setBodyDataUpperMuscleMass(18);
		setBodyDataLowerMuscleMass(18);
	}

	/**API */
	const addBodyData = async () => {
		const postData = {
			date: bodyDataDate,
			height: bodyDataHeight,
			weight: bodyDataWeight,
			upperBodyFat: bodyDataUpperBodyFat,
			lowerBodyFat: bodyDataLowerBodyFat,
			upperMuscleMass: bodyDataUpperMuscleMass,
			lowerMuscleMass: bodyDataLowerMuscleMass
		};
		const response = await bodyDataPostAPI.post("", postData);
	}

	/**handler */
	const handleBodyDataAdd = (event) => {
		props.setIsAddClicked((prev) => !prev);
		addBodyData();
		clearBodyDataForm();
	}

	return (
		<Card>
			<header>
				<h3>체성분 기록 추가</h3>
			</header>
			<main>
				<form onSubmit={handleBodyDataAdd}>
					<div className={classes.date}>
						<label htmlFor="date">날짜</label>
						<br />
						<input type="date" id="date" name="date" value={bodyDataDate} onChange={e => setBodyDataDate(e.target.value)} />
					</div>
					<div className={classes.container}>
						<div>
							<label htmlFor="height">키 (cm)</label>
							<input type="number" id="height" name="height" value={bodyDataHeight} onChange={e => setBodyDataHeight(e.target.value)} />
						</div>
						<div>
							<label htmlFor="weight">몸무게 (kg)</label>
							<input type="number" id="weight" name="weight" value={bodyDataWeight} onChange={e => setBodyDataWeight(e.target.value)} />
						</div>
						<div>
							<label htmlFor="upperBodyFat">상체 체지방 (%)</label>
							<input type="number" id="upperBodyFat" name="upperBodyFat" value={bodyDataUpperBodyFat} onChange={e => setBodyDataUpperBodyFat(e.target.value)} />
						</div>
						<div>
							<label htmlFor="lowerBodyFat">하체 체지방 (%)</label>
							<input type="number" id="lowerBodyFat" name="lowerBodyFat" value={bodyDataLowerBodyFat} onChange={e => setBodyDataLowerBodyFat(e.target.value)} />
						</div>
						<div>
							<label htmlFor="upperMuscleMass">상체 근육량 (%)</label>
							<input type="number" id="upperMuscleMass" name="upperMuscleMass" value={bodyDataUpperMuscleMass} onChange={e => setBodyDataUpperMuscleMass(e.target.value)} />
						</div>
						<div>
							<label htmlFor="lowerMuscleMass">하체 근육량 (%)</label>
							<input type="number" id="lowerMuscleMass" name="lowerMuscleMass" value={bodyDataLowerMuscleMass} onChange={e => setBodyDataLowerMuscleMass(e.target.value)} />
						</div>
					</div>
					<div className={classes.bodyDataAdd}>
						<Button type='submit'>추가</Button>
					</div>
				</form>
			</main>
		</Card>
	);

};

export default MemberBodyDataAdd;
