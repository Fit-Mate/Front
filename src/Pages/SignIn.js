import React from "react";
import Modal from "../UI/Modal";
import { Form, redirect, NavLink, useActionData } from "react-router-dom";
import { loginPostAPI } from "../API/API";
import LoginContext from "../Contexts/login-context";

const SignIn = (props) => {

	const data = useActionData();
	return (
		<Modal>
			<header>
				<h1>로그인</h1>
			</header>
			<main>
				<Form method="post" action="/signIn">
					<label>
						<span>ID : </span>
						<input type='text' name='id' required />
					</label>
					<label>
						<span>PassWord: </span>
						<input type='text' name='password' required />
					</label>
					<button>로그인</button>

					{data && data.error && <p>{data.error}</p>}
				</Form>
			</main>
			<footer>
				<NavLink to="/">취소하고 홈으로 돌아가기</NavLink>
				{/* 취소 / 로그인 */}
			</footer>
		</ Modal>
	);
};

export const signInAction = async ({ request }) => {

	const data = await request.formData();

	const submission = {
		id: data.get('id'),
		password: data.get('password'),
	}

	//서버로 id, password를 보내서 있다면 로그인
	//없다면 없다고 띄워주기.

	//post요청
	const response = await loginPostAPI.post("", submission);
	//ok / fail check
	const responseStatus = response.data;
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
