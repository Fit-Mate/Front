import React from "react";
import { supplementAPI } from "../API/API";

/**
 *
 * @param {*} props : props.supplement_id;
 * @returns
 */
const SupplementDelete = (props) => {

	/**
	 * Handler
	 */
	const handleModalClose = (event) => {
		props.onClose();
	}

	const handleDeleteID = async (event) => {
		console.log(props.id);
		const response = await supplementAPI.delete(`/${props.id}`);
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

export default SupplementDelete;
