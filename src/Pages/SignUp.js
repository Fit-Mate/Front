import React from "react";
import { Form, redirect, NavLink, useActionData } from "react-router-dom";
import { loginPostAPI, userIdVerifyAPI, userPostAPI } from "../API/API";

/**
 * SignUp에서 하는 기능
 * Form 작성
 * post 요청
 * 	post fail -> 적절하지 않은 필드값.
 * @param {*}
 * @returns
 */
const SignUp = (props) => {
	const data = useActionData();
	return (
		<div>
			<header>
				<h1>회원가입</h1>
			</header>
			<main>
				<Form method="post" action="/signUp">
					{/*<label>
						<span>userName : </span>
						<input type='text' name='userName' required />
					</label>
					<label>
						<span>loginId : </span>
						<input type='text' name='loginId' required />
					</label>
					<label>
						<span>password : </span>
						<input type='text' name='password' required />
					</label>
					<label>
						<span>sex : </span>
						<input type='text' name='sex' required />
					</label>
					<label>
						<span>date : </span>
						<input type='text' name='date' required />
					</label>
					<label>
						<span>height : </span>
						<input type='text' name='height' required />
					</label>
					<label>
						<span>weight : </span>
						<input type='text' name='weight' required />
					</label>
					<label>
						<span>upperBodyFat : </span>
						<input type='text' name='upperBodyFat' required />
					</label>
					<label>
						<span>lowerBodyFat : </span>
						<input type='text' name='lowerBodyFat' required />
					</label>
					<label>
						<span>upperMuscleMass: </span>
						<input type='text' name='upperMuscleMass' required />
					</label>
					<label>
						<span>lowerMuscleMass: </span>
						<input type='text' name='lowerMuscleMass' required />
					</label>*/}
					<div >
						<label htmlFor="userName">userName</label>
						<input type='text' id="userName" name="userName" placeholder="userName" />
					</div>
					<div >
						<label htmlFor="loginId">loginId</label>
						<input type='text' id="loginId" name="loginId" placeholder="loginId" />
					</div>
					<div >
						<label htmlFor="password">password</label>
						<input type='password' id="password" name="password" placeholder="password" />
					</div>
					<div >
						<fieldset>
							<legend>성별</legend>
							<input type='radio' id='male' name='sex' value="남성" />
							<label htmlFor="male">남성</label>
							<input type='radio' id='female' name='sex' value="여성" />
							<label htmlFor="female">여성</label>
						</fieldset>
					</div>
					{/*<div >
						<label htmlFor="date">Date</label>
						<input type='date' id="date" name="date" />
					</div>*/}
					<div >
						<label htmlFor="height">height</label>
						<input type='number' id="height" name="height" placeholder="height" />
					</div>
					<div >
						<label htmlFor="weight">weight</label>
						<input type='number' id="weight" name="weight" placeholder="weight" />
					</div>
					{/*<div >
						<label htmlFor="upperBodyFat">upperBodyFat</label>
						<input type='number' id="upperBodyFat" name="upperBodyFat" placeholder="upperBodyFat" />
					</div>
					<div >
						<label htmlFor="lowerBodyFat">lowerBodyFat</label>
						<input type='number' id="lowerBodyFat" name="lowerBodyFat" placeholder="lowerBodyFat" />
					</div>
					<div >
						<label htmlFor="upperMuscleMass">upperMuscleMass</label>
						<input type='number' id="upperMuscleMass" name="upperMuscleMass" placeholder="upperMuscleMass" />
					</div>
					<div >
						<label htmlFor="lowerMuscleMass">lowerMuscleMass</label>
						<input type='number' id="lowerMuscleMass" name="lowerMuscleMass" placeholder="lowerMuscleMass" />
					</div>*/}
					<button>회원가입</button>
					{data && data.error && <p>{data.error}</p>}
				</Form>
			</main>
			<footer>
				<NavLink to="/">취소하고 홈으로 돌아가기</NavLink>
				{/* 취소 / 로그인 */}
			</footer>
		</div >
	);
};

export const signUpAction = async ({ request }) => {
	const data = await request.formData();
	console.log(data);

	const submission = {
		userName: data.get('userName'),
		loginId: data.get('loginId'),
		password: data.get('password'),
		sex: data.get('sex'),
		date: "2023-01-01",
		height: 0.0,
		weight: 0.0,
		upperBodyFat: 0.0,
		lowerBodyFat: 0.0,
		upperMuscleMass: 0.0,
		lowerMuscleMass: 0.0,

		//date: data.get('date'),
		//height: data.get('height'),
		//weight: data.get('weight'),
		//upperBodyFat: data.get('upperBodyFat'),
		//lowerBodyFat: data.get('lowerBodyFat'),
		//upperMuscleMass: data.get('upperMuscleMass'),
		//lowerMuscleMass: data.get('lowerMuscleMass'),
	}
	console.log(submission);
	//아이디 중복검사
	const verifyResponse = await userIdVerifyAPI(`/${submission.loginId}`);
	if (verifyResponse.data !== "ok")
		return { error: "Duplicate LoginId" };
	else {
		const response = await userPostAPI.post("/", submission);
		if (response.data === "ok") {
			return redirect('/');
		}
		else {
			return { error: "Wrong Input" }
		}
	}
}

export default SignUp;
