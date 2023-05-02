import React from "react";
import { workoutAPI } from "../../API/API";

import Button from "../../UI/Button";

/**
 *
 * @param {*} props : props.workout_id;
 * @returns
 */
const WorkoutDelete = (props) => {
	/**
	 * Handler
	 */
	const handleModalClose = (event) => {
		props.onClose();
	}

	const handleDeleteID = async (event) => {
		console.log(props.id);
		const response = await workoutAPI.delete(`/${props.id}`);
		props.onClose();
	}

	return (
		<React.Fragment>
			<Button type="button" onClick={handleDeleteID}>삭제</Button>
			<Button type="button" onClick={handleModalClose}>취소</Button>
		</React.Fragment>
	)
};

export default WorkoutDelete;
