import React, { useContext } from "react";
import { useLocation } from "react-router";
import LoginContext from "../../Contexts/login-context";
import { bodyDataAPI } from "../../API/API";
import { bodyData_data } from "../../DataTypes/data-types";


/**
 *
 * @param {*} location.state.submission : {userName, sex, weight, height}
 * @returns
 */
const ExerciseRecommendForm = (props) => {


	const getRecentBodyData = async (loginId, isLoggedIn) => {
		let bodyData;
		if (!isLoggedIn) {
			//default 운동정보 생성 w/ submission 정보
			const data = location.state.submission;
			//임시 default정보 생성 : ...bodyData_data
			bodyData = {
				...bodyData_data,
				...data,
			};
		}
		else {
			const recentBodyData = getRecentBodyData(loginId);
			//임시 cookie :
			bodyData = recentBodyData;
			const cookie = "123";
			const bodyData = await bodyDataAPI.get(`/recent?cookie={${cookie}}`);
		}
		return bodyData;
	}

	const loginCtx = useContext(LoginContext);
	const location = useLocation();
	let bodyData = getRecentBodyData(loginCtx.loginId, loginCtx.isLoggedIn);

	/** form 보낼 때 bodyData 설정. */
	//비회원일 경우



	return (
		<div>
			<header> ExerciseRecommendForm </header>
			<main>
				{/*<ExerciseRecommendCheckBox />*/}
			</main>
		</div>
	);

};

export default ExerciseRecommendForm;
