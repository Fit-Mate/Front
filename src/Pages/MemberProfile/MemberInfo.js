import React, {useState} from "react";
import MemberLeaveModal from "./MemberLeaveModal";
import Card from "../../UI/Card";
import Modal from "../../UI/Modal";
import { userAPI, userPasswordAPI, userPutAPI } from "../../API/API";
import { userData_data } from "../../DataTypes/data-types";

/**
 *
 * @param {*} props : cookie, setUserName, userName, onClick
 * @returns
 */
const MemberNameChangeModal = (props) => {

	const putNameChange = async () => {
		const tempCookie = "";
		const response = await userPutAPI(`?cookie={${tempCookie}}`, props.userName);
	}
	const handleSubmit = (event) => {
		putNameChange();
		props.onClick(false);
	}

	return (
		<Modal>
			<form onSubmit={handleSubmit}>
				<label htmlFor="userName">userName</label>
				<input type='text' id='userName' name='userName' placeholder={props.userName} value={props.userName} onChange={e => props.setUserName(e.target.value)} />
				<button type='submit'>저장</button>
			</form>
			<button type="button" onClick={()=>{props.onClick(false)}}>닫기</button>
		</Modal>
	);
}

/**
 *
 * @param {*} props cookie, setPassword, password, onClick
 * @returns
 */
const MemberPasswordChangeModal = (props) => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [canPasswordChange, setCanPasswordChange] = useState(true);

	const putPasswordChange = async () => {
		const tempCookie = "";
		const response = await userPasswordAPI(`?cookie={${tempCookie}}`, { oldPassword: oldPassword, newPassword: newPassword });
		if (response.data !== "ok") {
			setCanPasswordChange(false);
		}
		else {
			setCanPasswordChange(true);
		}
	}

	const handleSubmit = (event) => {
		putPasswordChange();

		if (canPasswordChange)
			props.onClick(false);
		else
			props.onClick(true);
	}

	return (
		<Modal>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="oldPassword">oldPassword</label>
					<input type='password' id='oldPassword' name='oldPassword' value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
				</div>
				<div>
					<label htmlFor="newPassword">newPassword</label>
					<input type='password' id='newPassword' name='newPassword' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
				</div>
				<button type='submit'>저장</button>
			</form>
			{!canPasswordChange && <p>cannot change password</p>}
			<button type="button" onClick={()=>{props.onClick(false)}}>닫기</button>
		</Modal>
	);
}

const MemberInfo = (props) => {

	/**state */
	const [id, setId] = React.useState("");
	const [userName, setUserName] = React.useState("");
	const [sex, setSex] = React.useState("남성");
	const [isNameChangeClicked, setIsNameChangeClicked] = React.useState(false);
	const [isPasswordChangeClicked, setIsPasswordChangeClicked] = React.useState(false);
	const [isLeaveClicked, setIsLeaveClicked] = React.useState(false);

	/**nonState */
	const tempCookie = "";
	/**function */
	const getMemberInfo = async () => {
		const memberInfoResponse = await userAPI.get(`?cookie={${tempCookie}}`);
		const memberInfo = {
			...userData_data,
			...memberInfoResponse.data
		};
		setId(memberInfo.id);
		setUserName(memberInfo.userName);
		setSex(memberInfo.sex);
	}

	/**useEffect */
	React.useEffect(() => {
		getMemberInfo();
	}, [])

	/**handler */
	const handleNameChangeClicked = (props) => {
		setIsNameChangeClicked(true);
	}

	const handlePasswordChangeClicked = (props) => {
		setIsPasswordChangeClicked(true);
	}

	const onLeaveClicked = (props) => {
		setIsLeaveClicked(true);
	}

	return (
		<div>
			{isNameChangeClicked && <MemberNameChangeModal cookie={tempCookie} onClick={setIsNameChangeClicked} setUserName={setUserName} userName={userName} />}
			{isPasswordChangeClicked && <MemberPasswordChangeModal cookie={tempCookie} onClick={setIsPasswordChangeClicked} />}
			{isLeaveClicked && <MemberLeaveModal cookie={tempCookie} onClick={setIsLeaveClicked} />}
			<Card>
				<header>
					<h2>회원정보</h2>
				</header>
				<main>
					<div>
						id <span>{`${id}`}</span>
					</div>
					<div>
						userName <span>{`${userName}`}</span>
						<button type='button' onClick={handleNameChangeClicked}>이름 수정</button>
					</div>
					<div>
						sex <span>{`${sex}`}</span>
					</div>
					<button type='button' onClick={onLeaveClicked}>탈퇴</button>
					<button type='button' onClick={handlePasswordChangeClicked}>비밀번호 변경</button>
				</main>
			</Card>
		</div>

	);

};

export default MemberInfo;
