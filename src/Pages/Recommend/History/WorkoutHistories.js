import React from "react";
import Card from "../../../UI/Card";
import WorkoutHistory from "./WorkoutHistory"

/**
 *
 * @param {*} props : recommendHistory setIsInquiryClicked
 * @returns
 */
const WorkoutHistories = (props) => {

	const recommends = props.recommendHistory.recommends;

	return (
		<Card>
			<header>
				<h3>{props.recommendHistory.question}</h3>
			</header>
			<ul>
				{props.recommendHistory.recommends.map((recommendElement) => {
					return (
						<li key={recommendElement.workoutName}>
							<WorkoutHistory recommendElement={recommendElement} />
						</li>
					);
				}
				)}
			</ul>
			<button type='button' onClick={e => props.setIsInquiryClicked(false)}>닫기</button>
		</Card>
	);

};

export default WorkoutHistories;
