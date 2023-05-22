import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LoginContext from "../Contexts/login-context";

import HeaderImage from "../Resources/Home_Header_Image.jpg";

/**Css */
import classes from "./Home.module.css";

const NonMemberHome = (props) => {
	return (
		<div>
			<header className={classes['main-image']}>
				<img src={HeaderImage} alt="Exellence in Exercising" />
			</header>
			<main>
				{/**3개월간 차트 요약 */}
				<h1>Fitmate Presents</h1>
				<p>프로필 관리</p>
				<p>운동 조회, 보조제 조회</p>
				<p>운동 추천, 보조제 추천</p>
				<p>Inbody 이력 관리</p>
			</main>
			<footer>
			</footer>
		</div>
	);
}

const MemberHome = (props) => {
	return (
		<div>
			<header className={classes['main-image']}>
				<img src={HeaderImage} alt="Exellence in Exercising" />
			</header>
			<main>
				<h1>Fitmate Presents</h1>
				<p>프로필 관리</p>
				<p>운동 조회, 보조제 조회</p>
				<p>운동 추천, 보조제 추천</p>
				<p>Inbody 이력 관리</p>
			</main>
			<footer>
			</footer>
		</div>
	);
}

const Home = (props) => {
	const loginCtx = useContext(LoginContext);

	useEffect(() => {
		if (localStorage.getItem("loginId") !== ""){
			loginCtx.setIsLoggedIn(true);
			loginCtx.setLoginId(localStorage.getItem("loginId"));
		}
	}, [])

	return (
		<div>
			{!loginCtx.isLoggedIn && <NonMemberHome />}
			{loginCtx.isLoggedIn && !loginCtx.isAdmin && <MemberHome />}
		</div>
	)
};

export default Home;
