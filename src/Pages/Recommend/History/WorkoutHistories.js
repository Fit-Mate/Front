import React from "react";
import Card from "../../../UI/Card";
import WorkoutHistory from "./WorkoutHistory"

/**
 *
 * @param {*} props : recommendHistory setIsInquiryClicked
 * @returns
 */
const WorkoutHistories = (props) => {

	console.log(props);

	return (
		<Card>
			<header>
			<h3>{props.recommendHistory.question}</h3>
			</header>
			<ul>
				{props.recommendHistory.recommends.map((recommendElement) => {
					<li>
						<WorkoutHistory recommendElement={recommendElement} />
					</li>
				}
				)}
			</ul>
			<button type='button' onClick={e => props.setIsInquiryClicked(false)}>닫기</button>
		</Card>
	);

};

export default WorkoutHistories;
