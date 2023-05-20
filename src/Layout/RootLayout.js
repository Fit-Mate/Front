import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import LoginContext from "../Contexts/login-context";

/**css */
import classes from "./RootLayout.module.css";


//isAdmin이면 로그아웃만 할수있도록
const ShowIfLoggedIn = (props) => {
	const loginCtx = props.loginCtx;

	const handleSignOut = (event) => {
		loginCtx.setIsAdmin(false);
		loginCtx.setIsLoggedIn(false);
		loginCtx.setLoginId("");
		localStorage.setItem("loginId", "");
	}

	return (
		<div>
			<ul>
				<li>
					<NavLink id='logout' to="/" onClick={handleSignOut}>로그아웃</NavLink>
				</li>
				<li>
					<NavLink to="/" >홈</NavLink>
				</li>
				<li>
					<NavLink to="inquiry">database조회</NavLink>
				</li>
				<li>
					{!loginCtx.isAdmin && <NavLink to="profile">회원 프로필 관리</NavLink>}
				</li>
				<li>
					{!loginCtx.isAdmin && <NavLink to="/exerciseRecommend">운동추천</NavLink>}
				</li>
				<li>
					{!loginCtx.isAdmin && <NavLink to="/supplementRecommend">보조제추천</NavLink>}
				</li>
				<li>
					{!loginCtx.isAdmin && <NavLink to="/bodyData">체성분이력</NavLink>}
				</li>
				<li>
					{!loginCtx.isAdmin && <NavLink to="/recommendationHistory">추천이력</NavLink>}
				</li>

			</ul>

		</div>
	);
}

const ShowIfNonMember = () => {
	return (
		<div>
			<ul>
				<li>
					<NavLink id='login' to="signIn">로그인</NavLink>
				</li>
				<li>
					<NavLink to="/" >홈</NavLink>
				</li>
				<li>
					<NavLink to="inquiry">database조회</NavLink>
				</li>
				<li>
					<NavLink to="signUp">회원가입</NavLink>
				</li>
			</ul>
		</div>
	);
}

const RootLayout = (props) => {

	const loginCtx = React.useContext(LoginContext);

	useEffect(() => {
		if (localStorage.getItem("loginId") !== "") {
			loginCtx.setIsLoggedIn(true);
			loginCtx.setLoginId(localStorage.getItem("loginId"));
		}
	}, []);

	return (
		<div>
			<header className={classes.RootLayout}>
				{(loginCtx.isLoggedIn || loginCtx.isAdmin) ?
					<ShowIfLoggedIn loginCtx={loginCtx} /> : <ShowIfNonMember />}
			</header>
			{/*{loginCtx.isLoggedIn || loginCtx.isAdmin ? showIfLoggedIn(loginCtx.isAdmin) : showIfNonMember()}*/}
			<Outlet />
			<footer>
			</footer>
		</div>
	);
};

export default RootLayout;
