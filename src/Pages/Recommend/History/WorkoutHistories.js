import React from "react";

/**
 *
 * @param {*} props : workoutHistoryBatch setIsInquiryClicked
 * @returns
 */
const WorkoutHistories = (props) => {

	return (
		<Card>
			<ul>
				{props.workoutHistoryBatch.map((history) => {
					<li>
						<WorkoutHistory history={history} />
					</li>
				}
				)}
			</ul>
			<button type='button' onClick={e => props.setIsInquiryClicked(false)}>닫기</button>
		</Card>
	);

};

export default WorkoutHistories;
