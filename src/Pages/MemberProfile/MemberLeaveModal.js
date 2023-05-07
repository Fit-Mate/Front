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
		const tempCookie="";
		const response = await userDeleteAPI.post(`?cookie={${tempCookie}}`);
	}

	const handleLeave = () => {
		leave();
		props.onClick(false);
	}

	return (
		<Modal>
			<button type="button" onClick={handleLeave}>탈퇴하시겠습니까?</button>
		</Modal>
	);

};

export default MemberLeaveModal;
