import React, { useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

import deepCopy, { workout_data } from "../../../DataTypes/data-types";
import { userWorkoutAPI, userWorkoutImageAPI, workoutAPI, userBodyPartAPI } from "../../../API/API";

import WorkoutInquiry from "./WorkoutInquiry";

import Modal from "../../../UI/Modal";
import Card, { HeaderCard } from "../../../UI/Card";
import Button from "../../../UI/Button";

import inquiryCss from "../Inquiry.module.css";
import { FaSearch } from "react-icons/fa";



const ShowWorkoutInquiry = (props) => {

	/**
	 * Non State
	 */
	const dummy_workout_data = deepCopy(workout_data);
	/**
	 * State
	 *
	 * naviageButtonClicked===1:next, === -1:prev ===0:notClicked
	 */

	const [workoutBatch, setWorkoutBatch] = React.useState([]);
	const [workout, setWorkout] = React.useState(workout_data);
	const [workoutId, setWorkoutId] = React.useState('');
	const [workoutImageBatch, setWorkoutImageBatch] = React.useState({});
	const [currentPage, setCurrentPage] = React.useState(1);
	const [isInquiryClicked, setIsInquiryClicked] = React.useState(false);
	const [inputWorkoutSearch, setInputWorkoutSeacrh] = React.useState("");

	const [bodyPart, setBodypart]=useState([]);
	const [selectedBodyPart, setSelectedBodyPart] = useState("all")

	/**
	 * Functions
	 */
	//bodyPartKoreanName을 Name으로써 반환하는 Array. bodyPartKoreanName : String[]
	const bodyPartListToStringWithNewlines = (bodyPartKoreanName) => {
		if (bodyPartKoreanName.length === 0)
			return "";

		const bodyPartParagraph = bodyPartKoreanName.reduce((accumulator, currentValue) =>
			`${accumulator}\n${currentValue}`
			, [])
		return bodyPartParagraph;
	}

	//list가 없을 경우에는...?
	//value가 없다면 default value로 초기화
	const loadWorkoutBatch = async () => {
		const request = {
			searchKeyword: null,
			bodyPartKoreanName: null
		}
		const workoutResponse = await userWorkoutAPI.post(`/search/list/${currentPage}`, request);
		const fitData = workoutResponse.data.map((obj) => {
			return {
				...workout_data,
				...obj,
			}
		})
		setWorkoutBatch(fitData);
	}

	const getWorkoutInfo = async () => {


		if (workoutBatch.length === 0)
			return;
		//key만 딱 뽑아서
		const idBatch = workoutBatch.map((workout) => workout.id);

		let images = [];
		let promises = [];

		for (let id of idBatch) {
			promises.push(userWorkoutImageAPI.get(`/${id}`));
		}

		let responses = await Promise.all(promises);
		for (let response of responses) {
			const imageRes = response;
			let result = (imageRes && imageRes.data) || [];
			let base64ImageString = Buffer.from(result, 'binary').toString('base64');
			let srcValue = `data:${imageRes.headers["Content-Type"]};base64,${base64ImageString}`;
			images.push(srcValue);
		}
		//for (let id of idBatch) {
		//	const imageRes = await userWorkoutImageAPI.get(`/${id}`);
		//	let result = (imageRes && imageRes.data) || [];
		//	let base64ImageString = Buffer.from(result, 'binary').toString('base64');
		//	let srcValue = `data:${imageRes.headers["Content-Type"]};base64,${base64ImageString}`;
		//	images.push(srcValue);
		//}
		setWorkoutImageBatch(images);
	}

	const getBodyPartInfo = async () => {
		const response = await userBodyPartAPI.get();
		setBodypart(response.data.bodyPartKoreanName);
		console.log(bodyPart);
	}



	/**
	 * Rendering Function
	 */

	//Batch가 아닌 Batch의 object 하나만 받음.
	const makeTableHead = () => {
		return (
			<thead>
				<tr>
					<th>이미지</th>
					<th>이름</th>
					<th>설명</th>
					<th>운동 부위</th>
				</tr>
			</thead>
		);
	}

	const makeTableBodyElements = () => {
		const columns = workoutBatch.map((workout, index) => {
			return (
				<tr key={workout.id}>
					<td className={inquiryCss.img}>
						<img src={workoutImageBatch[index]}></img>
					</td>
					<td className={inquiryCss.koreanName}>
						<a href="https://" id={workout.id} onClick={handleInquiryClicked}>
							{workout.koreanName}
						</a>
					</td>
					<td className={inquiryCss.description}>{workout.description.slice(0, 40) + "..."}</td>
					<td className={inquiryCss.other}>{bodyPartListToStringWithNewlines(workout.bodyPartKoreanName)}</td>
				</tr>
			);
		});
		return (
			<tbody>
				{columns}
			</tbody>
		)
	};

	/**
	 * Handler : Modal
	 */
	const handleModalClose = () => {
		setIsInquiryClicked(false);
	}

	const handleInquiryClicked = async (event) => {
		event.preventDefault();
		const id = event.target.id;
		//axios로부터 단건조회API사용.
		const response = await userWorkoutAPI.get(`/${id}`);
		const fitData = { ...workout_data, ...response.data, id: id };
		setWorkout(fitData);
		setIsInquiryClicked(true);
	}

	/**
	 *	Handler : Navigating page
	 */
	const handleNavigatePage = async (event) => {
		const page = (event.target.id === 'prevPage' ? currentPage - 1 : currentPage + 1);
		if (page === 0)
			return;
		const response = await workoutAPI.get(`/search/list/${page}`);
		//axios로부터 return 받은 값이 NULL (읽지못함)일때, currentPage와 Batch Update 안함
		if (response.data.length === 0) {
			return;
		}
		//axios로부터 return 받았을때
		setWorkoutBatch(response.data);
		setCurrentPage(page);
	}

	const handleWorkoutSearch = async (event) => {
		event.preventDefault();
		const formData = {
			searchKeyword: inputWorkoutSearch,
			bodyPartKoreanName: selectedBodyPart === "all" ? null : [selectedBodyPart],

		}
		//axios로부터 단건조회API사용.
		const response = await userWorkoutAPI.post(`/search/list/${currentPage}`, formData);
		const fitData = [...response.data]
		setWorkoutBatch(fitData);
	}


	/**
	 * UseEffect When Rendering.
	 * fetch workout BATCH from backend
	 */

	React.useEffect(() => {
		loadWorkoutBatch(1);
		getBodyPartInfo();
	}, [])

	React.useEffect(() => {
		getWorkoutInfo();
	}, [workoutBatch])

	//이미지상단에띄우는기능..?
	return (
		<Card>
			{isInquiryClicked &&
				<Modal>
					<WorkoutInquiry workout={workout} onClose={handleModalClose} />
				</Modal>
			}

			<Card >
				<form onSubmit={handleWorkoutSearch} className={inquiryCss.searchCard}>
					<label htmlFor="searchWorkout">운동 검색</label>
					<input type='text'
						id="searchWorkout"
						name="searchWorkout"
						value={inputWorkoutSearch}
						onChange={e => setInputWorkoutSeacrh(e.target.value)}
					/>
					<select onChange={e => setSelectedBodyPart(e.target.value)}>
						<option key={0} value={"all"}>all</option>
						{bodyPart.map((bPart, index)=> {
							return (
								<option key={index} value={bPart.koreanName}>{bPart.koreanName}</option>
							)
						})}
					</select>
					<Button type='submit'>search <span><FaSearch /></span></Button>
				</form>
			</Card>

			<table className={inquiryCss.showtable}>
				{makeTableHead(workout_data)}
				{makeTableBodyElements()}
			</table>
			<footer>
				<Button id="prevPage" onClick={handleNavigatePage}>Prev</Button>
				<Button id="nextPage" onClick={handleNavigatePage}>Next</Button>
			</footer>
		</Card>
	);
};

export default ShowWorkoutInquiry;
