import React, { useState, useEffect } from "react";
import { userWorkoutImageAPI } from "../../../API/API";
import { Buffer } from "buffer";

/**
 * @param {*} props : workout, handleModalClose
 */
const WorkoutInquiry = (props) => {
	const [workoutImage, setWorkoutImage] = useState(null);

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
			<p>image</p>
			<img width="100" height="100" src={workoutImage} />
			<div>
				<iframe src={videoSrc} title={props.workout.koreanName}></iframe>
			</div>
			<ul>
				{description}
			</ul>

			<button onClick={handleModalClose}>닫기</button>
		</div >

	);
};

export default WorkoutInquiry;
