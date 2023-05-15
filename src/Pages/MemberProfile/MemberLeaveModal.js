import React, { useContext, useState } from "react";
import { userAPI, userDeleteAPI } from "../../API/API";
import Modal from "../../UI/Modal";
import LoginContext from "../../Contexts/login-context";

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
			<form onSubmit={handleLeave}>
				<label htmlFor="password">비밀번호</label>
				<input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} />
				<button type="submit">탈퇴하시겠습니까?</button>
			</form>
			{isWrongPassword && <p>Wrong Password</p>}
			<button type="button" onClick={handleClose}>닫기</button>
		</Modal>
	);

};

export default MemberLeaveModal;
