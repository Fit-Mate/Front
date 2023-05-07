import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import LoginContext from "../Contexts/login-context";


//isAdmin이면 로그아웃만 할수있도록
const ShowIfLoggedIn = (props) => {
	const loginCtx = props.loginCtx;
	const handleSignOut = (event) => {
		loginCtx.setIsAdmin(false);
		loginCtx.setIsLoggedIn(false);
	}

	return (
		<div>
			<NavLink to="/" onClick={handleSignOut}>로그아웃</NavLink>
			{!loginCtx.isAdmin && <NavLink to="profile">회원 프로필 관리</NavLink>}
			{!loginCtx.isAdmin && <NavLink to="/">홈</NavLink>}
		</div>
	);
}

const ShowIfNonMember = () => {
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
			{/*{loginCtx.isLoggedIn || loginCtx.isAdmin ? showIfLoggedIn(loginCtx.isAdmin) : showIfNonMember()}*/}
			{(loginCtx.isLoggedIn || loginCtx.isAdmin) ?
				<ShowIfLoggedIn loginCtx={loginCtx}/> : <ShowIfNonMember />}
			<Outlet />
		</div>
	);
};

export default RootLayout;
