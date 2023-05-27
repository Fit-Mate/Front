import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { workoutImageAPI } from "../../API/API";
import Button from "../../UI/Button";
import CustomTable from "../../UI/CustomTable";

import classes from "../css/Manage.module.css";

/**
 * @param {*} props : workout, handleModalClose
 */


const bodyPartListToStringWithNewlines = (bodyPartKoreanName) => {
	if (bodyPartKoreanName.length === 0)
		return "";

	const bodyPartParagraph = bodyPartKoreanName.reduce((accumulator, currentValue) =>
		`${accumulator}\n${currentValue}`
		, [])
	return bodyPartParagraph;
}


const WorkoutInquiry = (props) => {


	const workout = { ...props.workout };
	const entries = Object.entries(workout).filter(([key, value]) => (value !== 0 && value !== null));
	const {image, ...work} = {...workout, bodyPartKoreanName:bodyPartListToStringWithNewlines(workout.bodyPartKoreanName)};

	const [workoutImage, setWorkoutImage] = useState(null);

	/**function */
	const getWorkoutInfo = async () => {
		const imageRes = await workoutImageAPI.get(`/image/${workout.id}`);
		let result = (imageRes && imageRes.data) || [];

		let base64ImageString = Buffer.from(result, 'binary').toString('base64');
		let srcValue = `data:${imageRes.headers["Content-Type"]};base64,${base64ImageString}`;
		setWorkoutImage(srcValue);
	}

	useEffect(() => {
		getWorkoutInfo();
	}, []);


	const handleModalClose = (event) => {
		props.onClose();
	}

	//entries를 format하기
	const description = entries.map((entry) => {
		return (
			<li key={entry[0]}>{`${entry[0]}: ${entry[1]}`}</li>
		)
	});

	return (
		<div>
			<div className={classes.imageContainer}>
				<p>image</p>
				<img src={workoutImage} />
			</div>
			<ul>
				<CustomTable object={work}></CustomTable>
			</ul>

			<Button onClick={handleModalClose}>닫기</Button>
		</div >

	);
};

export default WorkoutInquiry;
