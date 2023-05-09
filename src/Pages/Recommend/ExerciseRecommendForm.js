import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import LoginContext from "../../Contexts/login-context";
import { bodyDataAPI, nonAdminBodyPartAPI, nonAdminMachineAPI, recommendWorkoutPostAPI } from "../../API/API";
import { bodyData_data } from "../../DataTypes/data-types";
import Card from "../../UI/Card"

import ExerciseRecommend from "./ExerciseRecommend";
import RecentBodyDataModal from "./RecentBodyDataModal";

/**
 * Rendering Checkbox of BodyPartList Dynamically
 * @param {*} props : handleCheckedListOnChange(position, checkedarray), bodyPartList, checkedBodyPartState
 */
const ShowBodyPartCheckbox = (props) => {
	const bodyPartList = props.bodyPartList;
	const checkedBodyPartState = props.checkedBodyPartState;
	const handleCheckedListOnChange = props.handleCheckedListOnChange;

	return (
		<Card>
			<header>
				<h2>운동 부위 선택</h2>
			</header>
			<section>
				<ul>
					{bodyPartList.map((bodyPart, index) => {
						return (
							<li key={index}>
								<div>
									<input
										type='checkbox'
										id={`bodyPartCheckbox${index}`}
										name={bodyPart}
										value={bodyPart}
										//checked={checkedBodyPartState[index]}
										onChange={() => handleCheckedListOnChange(index, checkedBodyPartState, "bodyPart")}
									/>
									<label htmlFor={`bodyPartCheckbox${index}`}>{bodyPart}</label>
								</div>
							</li>
						);
					})}
				</ul>
			</section>
		</Card>
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
		<Card>
			<header>
				<h2>운동 부위에 따른 기구 선택</h2>
			</header>
			<section>
				<ul>
					{machineList.map((machine, index) => {
						return (
							<li key={index}>
								<div>
									<input
										type='checkbox'
										id={`machineCheckbox${index}`}
										name={machine}
										value={machine}
										//checked={checkedMachineState[index]}
										onChange={() => handleCheckedListOnChange(index, checkedMachineState, "machine")}
									/>
									<label htmlFor={`machineCheckbox${index}`}>{machine}</label>
								</div>
							</li>
						);
					})}
				</ul>
			</section>
		</Card>
	);
}


/**
 *
 * @param {*} location.state.submission : {userName, sex, weight, height}
 * @returns
 */
const ExerciseRecommendForm = (props) => {

	/**non-state */

	/**state */
	const [isSubmitClicked, setIsSubmitClicked] = useState(false);
	const [workoutRecommendationId, setWorkoutRecommendationId] = useState(-1);

	const [isShowRecentBodyDataClicked, setIsShowRecentBodyDataClicked] = useState(false);

	const [recentBodyData, setRecentBodyData] = useState({});
	const [bodyPartList, setBodyPartList] = useState([]);
	const [checkedBodyPartState, setCheckedBodyPartState] = useState([]);
	const [checkedBodyPartList, setCheckedBodyPartList] = useState([]);
	const [machineList, setMachineList] = useState([]);
	const [checkedMachineState, setCheckedMachineState] = useState([]);
	const [checkedMachineList, setCheckedMachineList] = useState([]);

	/**API */
	const getRecentBodyData = async () => {
		const recentResponse = await bodyDataAPI.get("/recent");
		setRecentBodyData(recentResponse.data);
	}

	const getBodyPartList = async () => {
		const bodyPartResponse = await nonAdminBodyPartAPI.get("/all");
		const data = bodyPartResponse.data.bodyPartKoreanName;
		const bodyParts = data.map((bodyPart) => bodyPart.koreanName);
		setBodyPartList(bodyParts);
	}

	const getMachineList = async () => {
		const requestBody = { bodyPartKoreanName: checkedBodyPartList };
		const machineResponse = await nonAdminMachineAPI.post("/list", requestBody);
		const machineObjList = machineResponse.data;
		const machines = machineObjList.map((machineObj) => machineObj.koreanName);
		setMachineList(machines);
	}

	const sendExerciseRecommendForm = async () => {
		const exerciseRecommendFormat = {
			bodyPartKoreanName: checkedBodyPartList,
			machineKoreanName: checkedMachineList
		};
		const postResponse = await recommendWorkoutPostAPI.post(`/workout`, exerciseRecommendFormat);
		const recId = postResponse.data.workoutRecommendationId;
		setWorkoutRecommendationId(recId);
	}

	/**useEffect */

	//First Render : getBodyPartList
	useEffect(() => {
		getRecentBodyData();
		getBodyPartList();
	}, []);


	//first Render시 bodyPartList에 대한 checker를 생성.
	useEffect(() => {
		const newArray = new Array(bodyPartList.length).fill(false);
		setCheckedBodyPartState(
			newArray
		)
	}, [bodyPartList]);

	//when BodypartState Changes (checkbox checked) => 이에 따라 machineList가 바뀌므로, request를 보내기 위해.
	useEffect(() => {
		const filteredBodyPartList = bodyPartList.filter((bodyPart, index) =>
			checkedBodyPartState[index]
		);
		setCheckedBodyPartList(filteredBodyPartList);
	}, [checkedBodyPartState]);

	//getMachineList based on checkedBodyPartList. checkedBodyPartList중에 true가 있을때만 반환하기.
	useEffect(() => {
		if (checkedBodyPartState.length !== 0) {
			const isTrueInvolved = checkedBodyPartState.reduce((accumulator, currentValue) => accumulator || currentValue);
			if (isTrueInvolved) {
				getMachineList();
			}
			else {
				setMachineList([]);
			}
		}
	}, [checkedBodyPartList]);

	//machineList가 바뀌면 checkedMachineState를 새로 만들어줌.
	useEffect(() => {
		setCheckedMachineState(
			new Array(machineList.length).fill(false)
		);
	}, [machineList])

	//when MachineList is Checked, request를 보내기 위해
	useEffect(() => {
		const filteredMachineList = machineList.filter((machine, index) =>
			checkedMachineState[index]
		);
		setCheckedMachineList(filteredMachineList);
	}, [checkedMachineState]);


	/**function */
	// checkedArray = checekdBodyList, checkedMachineList, checkType:"bodyPart", "machine"
	const handleCheckedListOnChange = (position, checkedArray, checkType) => {
		const updatedCheckedState = checkedArray.map((item, index) =>
			index === position ? !item : item
		);
		if (checkType === "bodyPart") {
			setCheckedBodyPartState(updatedCheckedState);
		}
		else if (checkType === "machine") {
			setCheckedMachineState(updatedCheckedState);
		}
	};

	const handleExercisePost = (event) => {
		event.preventDefault();
		setIsSubmitClicked(true);
		sendExerciseRecommendForm();
	}

	const handleShowRecentBodyDataClicked = () => {
		setIsShowRecentBodyDataClicked(true);
	}

	/**rendering function */

	/**function */
	//const getRecentBodyData = async (loginId, isLoggedIn) => {
	//	let bodyData;
	//	if (!isLoggedIn) {
	//	//default 운동정보 생성 w/ submission 정보
	//	const data = location.state.submission;
	//	//임시 default정보 생성 : ...bodyData_data
	//	bodyData = {
	//	...bodyData_data,
	//	...data,
	//	};
	//	}
	//	else {
	//	const recentBodyData = getRecentBodyData(loginId);
	//	임시 cookie :
	//	bodyData = recentBodyData;
	//	const bodyData = await bodyDataAPI.get(`/recent`);
	//	}

	//	const recentBodyData = getRecentBodyData(loginId);
	//	bodyData = recentBodyData;
	//	const bodyData = await bodyDataAPI.get(`/recent`);
	//	console.log(bodyData);
	//	return bodyData;
	//}



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
				<button type='button' onClick={handleShowRecentBodyDataClicked}>최근 인바디 정보 확인</button>

				{isShowRecentBodyDataClicked &&
					<RecentBodyDataModal
						recentBodyData={recentBodyData}
						setIsShowRecentBodyDataClicked={setIsShowRecentBodyDataClicked}
					/>
				}
				{isSubmitClicked &&
					<ExerciseRecommend
						workoutRecommendationId={workoutRecommendationId}
						setIsSubmitClicked={setIsSubmitClicked}
					/>}
			</main>
		</div>
	);

};

export default ExerciseRecommendForm;
