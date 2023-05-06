import React, { useContext } from "react";
import { useLocation } from "react-router";
import LoginContext from "../../Contexts/login-context";


/**
 *
 * @param {*} location.state.submission : {userName, sex, weight, height}
 * @returns
 */
const ExerciseRecommendForm = (props) => {

	const location = useLocation();
	const data = location.state.submission;
	let bodyData;

	//비회원일 경우
	const loginCtx = useContext(LoginContext);
	if (!loginCtx.isLoggedIn) {
		//default 운동정보 생성 w/ submission 정보

	}
	else {

	}


	return (
		<p>ExerciseRecommendForm</p>
	);

};

export default ExerciseRecommendForm;
