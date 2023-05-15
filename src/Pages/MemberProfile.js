import React, { useEffect, useContext } from "react";
import MemberInfo from "./MemberProfile/MemberInfo";
import MemberBodyDataSummary from "./MemberProfile/MemberBodyDataSummary";
import LoginContext from "../Contexts/login-context";

const MemberProfile = (props) => {

	const loginCtx = useContext(LoginContext);

	useEffect(() => {
		if (localStorage.getItem("loginId") !== ""){
			loginCtx.setIsLoggedIn(true);
			loginCtx.setLoginId(localStorage.getItem("loginId"));
		}
	}, []);

	return (
		<div>
			<header>
				<p>Memberprofile</p>
			</header>
			<main>
				<MemberInfo />
			</main>
			<footer>
				{/*<MemberBodyDataSummary />*/}
			</footer>
		</div>

	);

};

export default MemberProfile;
