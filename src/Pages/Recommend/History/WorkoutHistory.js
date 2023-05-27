import React from "react";
import Card from "../../../UI/Card";
import classes from "./Histories.module.css";
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
			<div className={classes.CardContent}>
				<h3>{props.recommendElement.workoutName}</h3>
				<iframe src={videoSrc} title={props.recommendElement.workoutName}></iframe>
				<p className={classes.descriptionBorder}>상세 추천 이력</p>
				<div className={classes.description}>
					{props.recommendElement.description}
				</div>
			</div>
		</Card>
	);

};

export default WorkoutHistory;
