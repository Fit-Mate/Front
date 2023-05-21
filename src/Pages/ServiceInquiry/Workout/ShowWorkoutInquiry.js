import React from "react";
import axios from "axios";

import deepCopy, { workout_data } from "../../../DataTypes/data-types";
import { userWorkoutAPI, workoutAPI } from "../../../API/API";
import classes from "../../../Manage/css/Manage_Supplement.module.css";

import WorkoutInquiry from "./WorkoutInquiry";

import Modal from "../../../UI/Modal";
import Card, { HeaderCard } from "../../../UI/Card";
import Button from "../../../UI/Button";


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
	const [currentPage, setCurrentPage] = React.useState(1);
	const [isInquiryClicked, setIsInquiryClicked] = React.useState(false);
	const [inputWorkoutSearch, setInputWorkoutSeacrh] = React.useState("");

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

	/**
	 * Rendering Function
	 */

	//Batch가 아닌 Batch의 object 하나만 받음.
	const makeTableHead = () => {
		return (
			<thead>
				<tr>
					<th>englishName</th>
					<th>koreanName</th>
					<th>description</th>
					<th>bodyPartKoreanName</th>
					<th>조회</th>
				</tr>
			</thead>
		);
	}

	const makeTableBodyElements = () => {
		const columns = workoutBatch.map((workout) => {
			return (
				<tr key={workout.id}>
					<td>{workout.englishName}</td>
					<td>{workout.koreanName}</td>
					<td>{workout.description.slice(0, 40) + "..."}</td>
					<td>{bodyPartListToStringWithNewlines(workout.bodyPartKoreanName)}</td>
					<td>
						<Button id={workout.id} onClick={handleInquiryClicked}>조회</Button>
					</td>
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
		const id = event.target.id;
		//axios로부터 단건조회API사용.
		const response = await userWorkoutAPI.get(`/${id}`);
		const fitData = { ...workout_data, ...response.data, id:id };
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
	}, [])

	//이미지상단에띄우는기능..?
	return (
		<Card>
			<HeaderCard title={props.title} />
			{isInquiryClicked &&
				<Modal>
					<WorkoutInquiry workout={workout} onClose={handleModalClose} />
				</Modal>
			}

			<Card>
				<form onSubmit={handleWorkoutSearch}>
					<label htmlFor="searchWorkout">searchWorkout</label>
					<input type='text'
						id="searchWorkout"
						name="searchWorkout"
						value={inputWorkoutSearch}
						onChange={e => setInputWorkoutSeacrh(e.target.value)}
					/>
					<Button type='submit'>search</Button>
				</form>
			</Card>

			<table>
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
