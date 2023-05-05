import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import LoginContext from "../Contexts/login-context";

const showIfLoggedIn = () => {
	return (
		<div>
			<NavLink index>로그아웃</NavLink>
			<NavLink to="profile">회원 프로필 관리</NavLink>
		</div>
	);
}

const showIfNonMember= () => {
	return (
		<div>
			<NavLink to="signIn">로그인</NavLink>
			<NavLink to="signUp">회원가입</NavLink>
		</div>
	);
}

const RootLayout = (props) => {

	const loginCtx = React.useContext(LoginContext);

	return (
		<div>
			{loginCtx.isLoggedIn ? showIfLoggedIn() : showIfNonMember()}
			<Outlet />
		</div>
	);
};

export default RootLayout;
