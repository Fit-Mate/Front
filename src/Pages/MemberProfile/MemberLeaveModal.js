import React, { useContext, useState } from "react";
import { userAPI, userDeleteAPI } from "../../API/API";
import Modal from "../../UI/Modal";
import LoginContext from "../../Contexts/login-context";

import Button from "../../UI/Button";
import profileCss from "./ProfileModal.module.css";

/**
 *
 * @param {*} props : cookie, onClick
 * @returns
 */
const MemberLeaveModal = (props) => {

	/**Context */
	const loginCtx = useContext(LoginContext);

	/**state */
	const [isWrongPassword, setIsWrongPassword] = useState(false);
	const [password, setPassword] = useState("");


	/**API */
	const leave = async () => {
		const response = await userDeleteAPI.post("", { password: password });
		if (response.data === "fail") {
			setIsWrongPassword(true);
		}
		else {
			setIsWrongPassword(false, () => {
				props.onClick(false);
				loginCtx.setIsLoggedIn(false);
				loginCtx.setLoginId("");
			});
		}
	}

	/**handler */
	const handleLeave = (e) => {
		e.preventDefault();
		leave();
	}

	/**useEffect */


	const handleClose = () => {
		props.onClick(false);
	}

	return (
		<Modal>
			<form onSubmit={handleLeave} className={`${profileCss.nameChange} ${profileCss.deleteUser}`}>
				<div>
					<label htmlFor="password">비밀번호</label>
					<input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} />
				</div>
				<div>
					<Button type="submit">탈퇴하시겠습니까?</Button>
					<Button type="button" onClick={handleClose}>닫기</Button>
				</div>
			</form>
			{isWrongPassword && <p>Wrong Password</p>}
		</Modal>
	);

};

export default MemberLeaveModal;
