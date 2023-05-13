import React from "react";
import Card from "../../../UI/Card";
/**
 *
 * @param {*} props : recommendElement
 * @returns
 */
const WorkoutHistory = (props) => {

	let videoId = props.recommendElement.videoLink.split('=')[1];
	const videoSrc = `https://www.youtube.com/embed/${videoId}`;
	return (
		<Card>
			<div>
				<p>workoutName: {props.recommendElement.workoutName}</p>
				<iframe src={videoSrc} title={props.recommendElement.workoutName}></iframe>
				<p>description: {props.recommendElement.description}</p>
			</div>
		</Card>
	);

};

export default WorkoutHistory;
