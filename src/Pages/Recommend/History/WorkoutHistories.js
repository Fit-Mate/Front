import React from "react";
import Card from "../../../UI/Card";
import WorkoutHistory from "./WorkoutHistory"
import Modal from "../../../UI/Modal";
import classes from "./Histories.module.css";
import Button from "../../../UI/Button";

/**
 *
 * @param {*} props : recommendHistory setIsInquiryClicked
 * @returns
 */
const WorkoutHistories = (props) => {

	const recommends = props.recommendHistory.recommends;

	return (
		<div className={classes.ModalContainer}>
			<Modal>
				<div className={classes.Histories}>
					<header>
						<h2>운동 추천</h2>
					</header>
					<ul>
						{props.recommendHistory.recommends.map((recommendElement) => {
							return (
								<li key={recommendElement.workoutName} className={classes.CardContainer}>
									<WorkoutHistory recommendElement={recommendElement} />
								</li>
							);
						}
						)}
					</ul>
					<Button type='button' onClick={e => props.setIsInquiryClicked(false)}>닫기</Button>
				</div>
			</Modal>
		</div>
	);

};

export default WorkoutHistories;
