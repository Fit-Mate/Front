import React from "react";
import { machineAPI } from "../../API/API";
import Button from "../../UI/Button";

/**
 *
 * @param {*} props : props.machine_id;
 * @returns
 */
const MachineDelete = (props) => {

	/*
	 * Handler
	 */
	const handleModalClose = (event) => {
		props.onClose();
	}

	const handleDeleteID = async (event) => {
		console.log(props.id);
		const response = await machineAPI.delete(`/${props.id}`);
		props.onClose();
	}

	return (
		<React.Fragment>
			<Button type="button" onClick={handleDeleteID}>삭제</Button>
			<Button type="button" onClick={handleModalClose}>취소</Button>
		</React.Fragment>
	)
};

export default MachineDelete;
