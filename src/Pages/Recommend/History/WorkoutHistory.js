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
				<p>workoutName: ${props.recommendationBody.englishName}</p>
				<p>videoLink: ${props.recommendationBody.koreanName}</p>
				<p>description: ${props.recommendationBody.description}</p>
			</div>
		</Card>
	);

};

export default WorkoutHistory;
