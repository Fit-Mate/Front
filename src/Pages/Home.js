import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LoginContext from "../Contexts/login-context";
import MemberBodyDataSummary from "./MemberProfile/MemberBodyDataSummary";

const NonMemberHome = (props) => {
	return (
		<div>
			<main>
				<h1>HTML Ipsum Presents</h1>

				<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
			</main>
			<footer>
				<NavLink to="nonMemberform">비회원 운동정보 추천 받기</NavLink>
			</footer>
		</div>
	);
}

const MemberHome = (props) => {
	return (
		<div>
			<main>
				{/**3개월간 차트 요약 */}
				<h1>HTML Ipsum Presents</h1>

				<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

				<MemberBodyDataSummary />


			</main>
			<footer>
				<br />
				<br />

				<NavLink to="exerciseRecommend">회원 운동정보 추천 받기</NavLink>
				<NavLink to="supplementRecommend">회원 보조제정보 추천 받기</NavLink>
				<NavLink to="recommendationHistory">회원 정보 관리</NavLink>
				<br />
				<br />
				<br />
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
