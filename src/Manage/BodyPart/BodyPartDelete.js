import React from "react";
import { bodyPartAPI } from "../../API/API";

import Button from "../../UI/Button";

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
			<Button type="button" onClick={handleDeleteID}>삭제</Button>
			<Button type="button" onClick={handleModalClose}>취소</Button>
		</React.Fragment>
	)
};

export default BodyPartDelete;
