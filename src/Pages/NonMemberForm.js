import React, { useEffect } from "react";
import { Form, redirect, NavLink, useActionData } from "react-router-dom";
import { loginPostAPI, userIdVerifyAPI, userPostAPI } from "../API/API";

const LinkToRecommendation = (props) => {
	const submission = props.data;


	return (
		<div>
			{/*<NavLink to="/exerciseRecommend">Goto exerciseRecommend</NavLink>*/}
			<NavLink
				to="/exerciseRecommend"
				state={{ submission: submission }}>
				Goto exerciseRecommend
			</NavLink>
			<NavLink to="/supplementRecommend" >
				Goto supplementRecommend
			</NavLink>
		</div>
	);
}

/**
 * NonMemberForm에서 하는 기능
 * Form 작성
 * Form을 Navigate
 * @param {*}
 * @returns
 */
const NonMemberForm = (props) => {
	const data = useActionData();
	return (
		<div>
			<header>
				<h1>비회원 필수 양식</h1>
			</header>
			<main>
				<Form method="post" action="/NonMemberForm">
					<div >
						<label htmlFor="userName">userName</label>
						<input type='text' id="userName" name="userName" placeholder="userName" />
					</div>
					<div >
						<fieldset>
							<legend>성별</legend>
							<input type='radio' id='male' name='sex' value="male" />
							<label htmlFor="male">남성</label>
							<input type='radio' id='female' name='sex' value="female" />
							<label htmlFor="female">여성</label>
						</fieldset>
					</div>
					<div >
						<label htmlFor="height">height</label>
						<input type='number' id="height" name="height" placeholder="height" />
					</div>
					<div >
						<label htmlFor="weight">weight</label>
						<input type='number' id="weight" name="weight" placeholder="weight" />
					</div>
					{(data == null) && <button>제출하기</button>}
					{data && <LinkToRecommendation data={data.submission} />}
				</Form>
			</main>
			<footer>
				<NavLink to="/">취소하고 홈으로 돌아가기</NavLink>
				{/* 취소 / 로그인 */}
			</footer>
		</div >
	);
};

export const nonMemberFormAction = async ({ request }) => {
	const data = await request.formData();
	console.log(data);

	const submission = {
		userName: data.get('userName'),
		sex: data.get('sex'),
		height: data.get('height'),
		weight: data.get('weight'),
	}

	console.log(submission);
	return { something: "default", submission: submission }
}

export default NonMemberForm;
