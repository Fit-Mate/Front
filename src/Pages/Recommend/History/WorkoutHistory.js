import React from "react";
import Card from "../../../UI/Card";
/**
 *
 * @param {*} props : recommendElement
 * @returns
 */
const WorkoutHistory = (props) => {

	return (
		<Card>
			<div>
				<p>workoutName: ${props.recommendElement.englishName}</p>
				<p>videoLink: ${props.recommendElement.koreanName}</p>
				<p>description: ${props.recommendElement.description}</p>
			</div>
		</Card>
	);

};

export default WorkoutHistory;
