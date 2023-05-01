import React from "react";
import { workoutAPI } from "../../API/API";

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
			<button type="button" onClick={handleDeleteID}>삭제</button>
			<br/>
			<button type="button" onClick={handleModalClose}>취소</button>
		</React.Fragment>
	)
};

export default WorkoutDelete;
