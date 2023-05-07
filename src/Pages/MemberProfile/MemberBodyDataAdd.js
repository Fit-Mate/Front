import React, { useState } from "react";
import Card from "../../UI/Card";
import {bodyDataPostAPI} from "../../API/API";

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
			date:bodyDataDate,
			height:bodyDataHeight,
			weight:bodyDataWeight,
			upperBodyFat:bodyDataUpperBodyFat,
			lowerBodyFat:bodyDataLowerBodyFat,
			upperMuscleMass:bodyDataUpperMuscleMass,
			lowerMuscleMass:bodyDataLowerMuscleMass
		};
		const response = await bodyDataPostAPI.post("", postData);
		console.log(response);
	}

	/**handler */
	const handleBodyDataAdd = (event) => {
		event.preventDefault();
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
					<div>
						<label htmlFor="date">Date</label>
						<input type="date" id="date" name="date" value={bodyDataDate} onChange={e => setBodyDataDate(e.target.value)} />
					</div>
					<div>
						<label htmlFor="height">Height</label>
						<input type="number" id="height" name="height" value={bodyDataHeight} onChange={e => setBodyDataHeight(e.target.value)} />
					</div>
					<div>
						<label htmlFor="weight">weight</label>
						<input type="number" id="weight" name="weight" value={bodyDataWeight} onChange={e => setBodyDataWeight(e.target.value)} />
					</div>
					<div>
						<label htmlFor="upperBodyFat">upperBodyFat</label>
						<input type="number" id="upperBodyFat" name="upperBodyFat" value={bodyDataUpperBodyFat} onChange={e => setBodyDataUpperBodyFat(e.target.value)} />
					</div>
					<div>
						<label htmlFor="lowerBodyFat">lowerBodyFat</label>
						<input type="number" id="lowerBodyFat" name="lowerBodyFat" value={bodyDataLowerBodyFat} onChange={e => setBodyDataLowerBodyFat(e.target.value)} />
					</div>
					<div>
						<label htmlFor="upperMuscleMass">upperMuscleMass</label>
						<input type="number" id="upperMuscleMass" name="upperMuscleMass" value={bodyDataUpperMuscleMass} onChange={e => setBodyDataUpperMuscleMass(e.target.value)} />
					</div>
					<div>
						<label htmlFor="lowerMuscleMass">lowerMuscleMass</label>
						<input type="number" id="lowerMuscleMass" name="lowerMuscleMass" value={bodyDataLowerMuscleMass} onChange={e => setBodyDataLowerMuscleMass(e.target.value)} />
					</div>
					<button type='submit'>추가</button>
				</form>
			</main>
		</Card>
	);

};

export default MemberBodyDataAdd;
