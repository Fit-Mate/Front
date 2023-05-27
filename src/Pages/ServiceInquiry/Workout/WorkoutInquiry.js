import React, { useState, useEffect } from "react";
import { userWorkoutImageAPI, userBodyPartAPI} from "../../../API/API";
import { Buffer } from "buffer";
import Button from "../../../UI/Button";

import classes from "../Inquiry.module.css";

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

const ElementTable = (props) => {
	const bodyPartList = bodyPartListToStringWithNewlines(props.entries[4][1]);
	const entries = [props.entries[0], props.entries[1], props.entries[3], [props.entries[4][0], bodyPartList]];

	return (
		<table className={classes.Table}>
			{entries.map((keyval, index) => {
				const [key, val] = keyval;
				return (
					<tr key={index}>
						<td className={classes.key}>{key}</td>
						<td>{val}</td>
					</tr>
				)
			})}
		</table>
	);
}

const WorkoutInquiry = (props) => {
	const [workoutImage, setWorkoutImage] = useState(null);
	const [bodyPart, setBodypart] = useState([]);

	const workout = { ...props.workout };
	const entries = Object.entries(workout).filter(([key, value]) => (value !== 0 && value !== null));

	let videoId = props.workout.videoLink.split('=')[1];
	const videoSrc = `https://www.youtube.com/embed/${videoId}`;

	const handleModalClose = (event) => {
		props.onClose();
	}

	//entries를 format하기
	const description = entries.map((entry) => {
		if (entry[0] === 'image' || entry[0] === 'videoLink' || entry[0] === 'id')
			return;
		return (
			<li key={entry[0]}>{`${entry[0]}: ${entry[1]}`}</li>
		)
	});

	const getWorkoutInfo = async () => {
		const imageRes = await userWorkoutImageAPI.get(`/${workout['id']}`);
		let result = (imageRes && imageRes.data) || [];
		let base64ImageString = Buffer.from(imageRes.data, 'binary').toString('base64');
		let srcValue = `data:${imageRes.headers["Content-Type"]};base64,${base64ImageString}`;
		setWorkoutImage(srcValue);
	}

	/**useEffect */
	useEffect(() => {
		getWorkoutInfo();
	}, [])

	return (
		<div>
			<header className={classes.inquiryModalHeader}>
				<div>
					<h2>{workout.koreanName}</h2>
				</div>
			</header>
			<main>
				<div className={classes.imageContainer}>
					<p>이미지</p>
					<img src={workoutImage} />
				</div>
				<div className={classes.videoContainer}>
					<iframe src={videoSrc} title={props.workout.koreanName}></iframe>
				</div>
				<ElementTable entries={entries} />
				<Button onClick={handleModalClose}>닫기</Button>
			</main>
		</div >

	);
};

export default WorkoutInquiry;
