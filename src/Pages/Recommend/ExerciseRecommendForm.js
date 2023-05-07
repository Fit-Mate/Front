import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import LoginContext from "../../Contexts/login-context";
import { bodyDataAPI, nonAdminBodyPartAPI, nonAdminMachineAPI, recommendWorkoutPostAPI } from "../../API/API";
import { bodyData_data } from "../../DataTypes/data-types";


/**
 * Rendering Checkbox of BodyPartList Dynamically
 * @param {*} props : handleCheckedListOnChange(position, checkedarray), bodyPartList, checkedBodyPartState
 */
const ShowBodyPartCheckbox = (props) => {
	const bodyPartList = props.bodyPartList;
	const checkedBodyPartState = props.checkedBodyPartState;
	const handleCheckedListOnChange = props.handleCheckedListOnChange;

	return (
		<ul>
			{bodyPartList.map((bodyPart, index) => {
				return (
					<li key={index}>
						<div>
							<input
								type='checkbox'
								id={`checkbox${index}`}
								name={bodyPart}
								value={bodyPart}
								checked={checkedBodyPartState[index]}
								onChange={() => handleCheckedListOnChange(index, checkedBodyPartState)}
							/>
							<label htmlFor={`checkbox${index}`}>{bodyPart}</label>
						</div>
					</li>
				);
			})}
		</ul>
	);
}


/**
 * Rendering Checkbox of BodyPartList Dynamically
 * @param {*} props : handleCheckedListOnChange(position, checkedarray), machineList, checkedMachineState
 */
const ShowMachineCheckbox = (props) => {
	const machineList = props.machineList;
	const checkedMachineState = props.checkedMachineState;
	const handleCheckedListOnChange = props.handleCheckedListOnChange;

	return (
		<ul>
			{machineList.map((machine, index) => {
				return (
					<li key={index}>
						<div>
							<input
								type='checkbox'
								id={`checkbox${index}`}
								name={machine}
								value={machine}
								checked={checkedMachineState[index]}
								onChange={() => handleCheckedListOnChange(index, checkedMachineState)}
							/>
							<label htmlFor={`checkbox${index}`}>{machine}</label>
						</div>
					</li>
				);
			})}
		</ul>
	);
}


/**
 *
 * @param {*} location.state.submission : {userName, sex, weight, height}
 * @returns
 */
const ExerciseRecommendForm = (props) => {

	/**non-state */
	const tempCookie="";

	/**state */
	const [bodyPartList, setBodyPartList] = useState([]);
	const [checkedBodyPartState, setCheckedBodyPartState] = useState([]);
	const [checkedBodyPartList, setCheckedBodyPartList] = useState([]);
	const [machineList, setMachineList] = useState([]);
	const [checkedMachineState, setCheckedMachineState] = useState([]);
	const [checkedMachineList, setCheckedMachineList] = useState([]);

	/**API */
	const getBodyPartList = async () => {
		const bodyPartResponse = await nonAdminBodyPartAPI.get("/all");
		const bodyParts = bodyPartResponse.data;
		setBodyPartList(bodyParts);
	}

	const getMachineList = async () => {
		const machineResponse = await nonAdminMachineAPI.post("/list", checkedBodyPartList);
		const machines = machineResponse.data;
		setMachineList(machines);
	}

	const sendExerciseRecommendForm = async () => {
		const exerciseRecommendFormat = {
			bodyPartKoreanName:checkedBodyPartList,
			machineKoreanName:checkedMachineList
		};
		const postResponse = await recommendWorkoutPostAPI.post(`/workout?cookie={${tempCookie}}`);
	}

	/**useEffect */
	//First Render : getBodyPartList
	useEffect(() => {
		getBodyPartList();
		setCheckedBodyPartState(
			new Array(bodyPartList.length).fill(false)
		);
	}, []);

	//when BodypartState Changes (checkbox checked) => 이에 따라 machineList가 바뀌므로, request를 보내기 위해.
	useEffect(() => {
		const filteredBodyPartList = bodyPartList.filter((bodyPart, index)=>
			checkedBodyPartState[index]
		);
		setCheckedBodyPartList(filteredBodyPartList);
	}, [checkedBodyPartState]);

	//getMachineList based on checkedBodyPartList
	useEffect(() => {
		getMachineList();
		setCheckedMachineState(
			new Array(machineList.length).fill(false)
		);
	}, [checkedBodyPartList]);

	//when MachineList is Checked, request를 보내기 위해
	useEffect(() => {
		const filteredMachinePartList = machineList.filter((machine, index) =>
			checkedMachineState[index]
		);
		setCheckedMachineList(filteredMachinePartList);
	}, [checkedMachineState]);

	// checkedArray = checekdBodyList, checkedMachineList
	const handleCheckedListOnChange = (position, checkedArray) => {
		const updatedCheckedState = checkedArray.map((item, index) =>
			index === position ? !item : item
		);
		setCheckedBodyPartState(updatedCheckedState);
	};

	const handleExercisePost = (event) => {
		event.preventDefault();
		sendExerciseRecommendForm();
	}

	/**rendering function */

	/**function */
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



	return (
		<div>
			<header> <h1>ExerciseRecommendForm </h1></header>
			<main>
				{/* bodyPartCheckbox render */}
				<ShowBodyPartCheckbox
					bodyPartList={bodyPartList}
					checkedBodyPartState={checkedBodyPartState}
					handleCheckedListOnChange={handleCheckedListOnChange}
				/>
				{/* MachineCheckbox render */}
				<ShowMachineCheckbox
					machineList={machineList}
					checkedMachineState={checkedMachineState}
					handleCheckedListOnChange={handleCheckedListOnChange}
				/>
				<button type='button' onClick={handleExercisePost}>제출</button>
			</main>
		</div>
	);

};

export default ExerciseRecommendForm;
