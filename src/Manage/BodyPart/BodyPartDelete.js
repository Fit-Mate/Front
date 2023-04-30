import React from "react";
import { bodyPartAPI } from "../../API/API";

/**
 *
 * @param {*} props : props.bodyPart_id;
 * @returns
 */
const BodyPartDelete = (props) => {

	/**
	 * Handler
	 */
	const handleModalClose = (event) => {
		props.onClose();
	}

	const handleDeleteID = async (event) => {
		console.log(props.id);
		const response = await bodyPartAPI.delete(`/${props.id}`);
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

export default BodyPartDelete;
