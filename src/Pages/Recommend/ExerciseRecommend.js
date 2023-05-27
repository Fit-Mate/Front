import React from "react";
import Card from "../../UI/Card";

/**
 *
 * @param {*} props : 	workoutRecommendationId isSubmitClicked
 * @returns
 */
const ExerciseRecommend = (props) => {

	const handleClose = () => {
		props.setIsSubmitClicked(false);
	}

	return (
		<Card>
			<p>운동 추천</p>

			<button onClick={handleClose}>닫기</button>
		</Card>
	);

};

export default ExerciseRecommend;
