import React from "react";
import { userAPI, userDeleteAPI } from "../../API/API";
import Modal from "../../UI/Modal";

/**
 *
 * @param {*} props : cookie, onClick
 * @returns
 */
const MemberLeaveModal = (props) => {

	/**API */
	const leave = async () => {
		const response = await userDeleteAPI.post("");
	}

	const handleLeave = () => {
		leave();
		props.onClick(false);
	}

	const handleClose = () => {
		props.onClick(false);
	}

	return (
		<Modal>
			<button type="button" onClick={handleLeave}>탈퇴하시겠습니까?</button>
			<button type="button" onClick={handleClose}>닫기</button>
		</Modal>
	);

};

export default MemberLeaveModal;
