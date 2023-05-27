import React from "react";
import Modal2 from "../UI/Modal2";
import { Form, redirect, NavLink, useActionData } from "react-router-dom";
import { loginPostAPI } from "../API/API";

import Button from "../UI/Button";
import but from "../UI/Button.module.css"

import classes from "./SignIn.module.css"

const SignIn = (props) => {

	const data = useActionData();
	return (
		<Modal2>
			<header>
				<h1>로그인</h1>
			</header>
			<main className={classes.signIn}>
				<Form method="post" action="/signIn">
					<div className={classes.signInContent}>
						<label>
							<span className={classes.key}>ID  </span>
							<div className={classes.valContainer}>
								<input type='text' name='id' required />
							</div>
						</label>
					</div>
					<div className={classes.signInContent}>
						<label>
							<span className={classes.key}>PassWord </span>
							<div className={classes.valContainer}>
								<input type='password' name='password' required />
							</div>
						</label>
					</div>
					<button className={but.button}>로그인</button>

					{data && data.error && <p>{data.error}</p>}
				</Form>
			</main>
			<footer className={classes.navLink}>
				<NavLink to="/">취소하고 홈으로 돌아가기</NavLink>
				{/* 취소 / 로그인 */}
			</footer>
		</ Modal2>
	);
};

export const signInAction = async ({ request }) => {

	const data = await request.formData();

	const submission = {
		loginId: data.get('id'),
		password: data.get('password'),
	}
	console.log(submission);

	//서버로 id, password를 보내서 있다면 로그인
	//없다면 없다고 띄워주기.

	//post요청
	let response;
	if (submission.loginId === "admin") {
		response = await loginPostAPI.post("", submission);
	}
	else {
		response = await loginPostAPI.post("", submission);
	}
	//ok / fail check
	const responseStatus = response.data;
	console.log(responseStatus)
	if (responseStatus === "ok") {
		//cookie와 관련된 logic

		localStorage.setItem("loginId", submission.id);
		return redirect('/');
	}
	else {
		return { error: "Wrong login Info" };
	}
}

export default SignIn;
