import React from "react";

import { bodyDataDeleteAPI } from "../../../API/API";

/** CSS */
import classes from "../../../Manage/css/Manage_Supplement.module.css"

import Button from "../../../UI/Button";

/** */
import { bodyData_data } from "../../../DataTypes/data-types";


/**
 *
 * @param {*} props : props.bodyData_id;
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
		const response = await bodyDataDeleteAPI.delete(`/${props.id}`);
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
