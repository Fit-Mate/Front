import React, { useState } from "react";
import MemberLeaveModal from "./MemberLeaveModal";
import Card from "../../UI/Card";
import Modal from "../../UI/Modal";
import { userAPI, userPasswordAPI, userPutAPI } from "../../API/API";
import { userData_data } from "../../DataTypes/data-types";

import Button from "../../UI/Button";
import classes from "./MemberInfo.module.css";
import profileCss from "./ProfileModal.module.css";

import { FaUser } from 'react-icons/fa'; import { TbAlphabetLatin } from 'react-icons/tb';
import { BsGenderAmbiguous } from 'react-icons/bs'

/**
 *
 * @param {*} props : cookie, setUserName, userName, onClick
 * @returns
 */
const MemberNameChangeModal = (props) => {

	const putNameChange = async () => {
		const response = await userPutAPI.put("", { userName: props.userName });
	}
	const handleSubmit = (event) => {
		putNameChange();
		props.onClick(false);
	}

	return (
		<Modal>
			<div className={profileCss.modalContent}>
				<form onSubmit={handleSubmit} className={profileCss.nameChange}>
					<div>
						<div className={profileCss.nameChangeLabel}>
							<label htmlFor="userName">userName</label>
						</div>
						<div className={profileCss.nameChangeInput}>
							<input type='text' id='userName' name='userName' placeholder={props.userName} value={props.userName} onChange={e => props.setUserName(e.target.value)} />
						</div>
					</div>
					<div>
						<Button type='submit'>저장</Button>
						<Button type="button" onClick={() => { props.onClick(false) }}>닫기</Button>
					</div>
				</form>
			</div>
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
		const response = await userPasswordAPI.post("", { oldPassword: oldPassword, newPassword: newPassword });
		console.log(`${response.data} putPsswordChange`);
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
			<div className={profileCss.modalContent}>
				<form onSubmit={handleSubmit} className={profileCss.passwordChange}>
					<div>
						<label htmlFor="oldPassword">oldPassword</label>
						<input type='password' id='oldPassword' name='oldPassword' value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
					</div>
					<div>
						<label htmlFor="newPassword">newPassword</label>
						<input type='password' id='newPassword' name='newPassword' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
					</div>
					<Button type='submit'>저장</Button>
					<Button type="button" onClick={() => { props.onClick(false) }}>닫기</Button>
				</form>
				{!canPasswordChange && <p>cannot change password</p>}
			</div>
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
	/**function */
	const getMemberInfo = async () => {
		const memberInfoResponse = await userAPI.get("");
		const memberInfo = {
			...userData_data,
			...memberInfoResponse.data
		};
		setId(memberInfo.loginId);
		setUserName(memberInfo.userName);
		setSex(memberInfo.sex);
	}

	/**useEffect */
	React.useEffect(() => {
		getMemberInfo();
	}, []);

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
		<div className={classes.memberInfo}>
			{isNameChangeClicked && <MemberNameChangeModal onClick={setIsNameChangeClicked} setUserName={setUserName} userName={userName} />}
			{isPasswordChangeClicked && <MemberPasswordChangeModal onClick={setIsPasswordChangeClicked} />}
			{isLeaveClicked && <MemberLeaveModal onClick={setIsLeaveClicked} />}
			<Card >
				<header>
					<h2>회원정보</h2>
				</header>
				<main className={classes.infoItems}>
					<div>
						<p> <TbAlphabetLatin /> Name <span>{`${userName}`}</span>
							<span>
								<Button type='button' onClick={handleNameChangeClicked}>이름 수정</Button>
							</span> </p>
					</div>
					<div className={classes.padding}>
						<p> <FaUser /> id <span>{`${id}`}</span></p>
					</div>

					<div className={classes.padding}>
						<p> <BsGenderAmbiguous /> sex<span>{`${sex}`}</span> </p>
					</div>
				</main>
				<footer className={classes.footerButton}>
					<Button type='button' onClick={onLeaveClicked}>탈퇴</Button>
					<Button type='button' onClick={handlePasswordChangeClicked}>비밀번호 변경</Button>
				</footer>
			</Card>
		</div>

	);

};

export default MemberInfo;
