import React from "react";

/**
 *
 * @param {*} props : recommendationBody
 * @returns
 */
const WorkoutHistory = (props) => {

	return (
		<Card>
			<div>
				<p>workoutName: ${props.englishName}</p>
				<p>videoLink: ${props.koreanName}</p>
				<p>description: ${props.description}</p>
			</div>
		</Card>
	);

};

export default WorkoutHistory;
