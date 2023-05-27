import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import LoginContext from "../Contexts/login-context";
import { FaGithub } from "react-icons/fa"
import "../DarkMode.module.css";

/**css */
import classes from "./RootLayout.module.css";
import logo from "../Resources/Fitmate_logo_1.png";


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
					<NavLink to="/" >
						<a href="">
							<img className={classes.logoImage} src={logo} />
						</a></NavLink>
				</li>
				<li>
					<NavLink to="inquiry">운동/보조제 검색</NavLink>
				</li>
				<li>
					{!loginCtx.isAdmin && <NavLink to="/bodyData">체성분이력</NavLink>}
				</li>
				<li>
					{!loginCtx.isAdmin && <NavLink to="/recommendationHistory">추천이력</NavLink>}
				</li>
				<li>
					{!loginCtx.isAdmin && <NavLink to="/Recommend">보조제/운동추천</NavLink>}
				</li>
				<div>
					<div>
						<li>
							{!loginCtx.isAdmin && <NavLink to="profile">회원 프로필 관리</NavLink>}
						</li>
					</div>
					<div>
						<li>
							<NavLink id='logout' to="/" onClick={handleSignOut}>로그아웃</NavLink>
						</li>
					</div>

				</div>

			</ul>

		</div>
	);
}

const ShowIfNonMember = () => {
	return (
		<div>
			<ul>
				<li>
					<NavLink to="/" >
						<a href="">
							<img className={classes.logoImage} src={logo} />
						</a></NavLink>
				</li>
				<li>
					<NavLink to="inquiry">운동/보조제 검색</NavLink>
				</li>
				<div>
					<li>
						<NavLink to="signUp">회원가입</NavLink>
					</li>
					<li>
						<NavLink id='login' to="signIn">로그인</NavLink>
					</li>
				</div>
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
			<main className={classes.RootLayoutMain}>
				<Outlet />
			</main>
			<footer className={classes.RootLayoutFooter}>
				<div className={classes.child1}>
					<FaGithub />
					<a href="https://github.com/Fit-Mate">Github</a>
				</div>
				<div className={classes.child2}>
					Copyright <span>	&#169; </span> Fitmate 2023 Konkuk University Capstone.
				</div>
			</footer>
		</div>
	);
};

export default RootLayout;
