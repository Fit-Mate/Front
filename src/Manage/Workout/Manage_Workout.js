import React from "react";
import axios from "axios";

import deepCopy, { workout_data } from "../../DataTypes/data-types";
import { workoutAPI } from "../../API/API";
import classes from "../css/Manage_Supplement.module.css";

import WorkoutInquiry from "./WorkoutInquiry";
import WorkoutModify from "./WorkoutModify";
import WorkoutDelete from "./WorkoutDelete";
import WorkoutAdd from "./WorkoutAdd";

import Modal from "../../UI/Modal";
import Card, { HeaderCard } from "../../UI/Card";
import Button from "../../UI/Button";


const Manage_Workout = (props) => {

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
	const [isDeleteClicked, setIsDeleteClicked] = React.useState(false);
	const [isModifyClicked, setIsModifyClicked] = React.useState(false);
	const [isAddClicked, setIsAddClicked] = React.useState(false);


	/**
	 * Functions
	 */
	//bodyPartKoreanName을 Name으로써 반환하는 Array. bodyPartKoreanName : String[]
	const bodyPartListToStringWithNewlines = (bodyPartKoreanName) => {
		if (bodyPartKoreanName.length === 0)
			return "";
		const bodyPartParagraph = bodyPartKoreanName.reduce((accumulator, currentValue) =>
			`${accumulator}\n${currentValue}`
			, []);
		return bodyPartParagraph;
	}

	//list가 없을 경우에는...?
	//value가 없다면 default value로 초기화
	const loadWorkoutBatch = async () => {
		const workoutResponse = await workoutAPI.get(`/list/${currentPage}`);
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
					<th>수정</th>
					<th>삭제</th>
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
					<td>{workout.description.slice(0, 20) + "..."}</td>
					<td>{bodyPartListToStringWithNewlines(workout.bodyPartKoreanName)}</td>
					<td>
						<Button id={workout.id} onClick={handleInquiryClicked}>조회</Button>
					</td>
					<td>
						<Button id={workout.id} onClick={handleModifyClicked}>수정</Button >
					</td>
					<td>
						<Button id={workout.id} onClick={handleDeleteClicked}>삭제</Button >
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
		setIsModifyClicked(false);
		setIsInquiryClicked(false);
		setIsDeleteClicked(false);
		setIsAddClicked(false);
	}

	const handleInquiryClicked = async (event) => {
		const id = event.target.id;
		//axios로부터 단건조회API사용.
		const response = await workoutAPI.get(`/${id}`);
		const fitData = { ...workout_data, ...response.data, id: id };
		setWorkout(fitData);
		setIsInquiryClicked(true);
	}

	const handleDeleteClicked = (event) => {
		setWorkoutId(() => event.target.id);
		setIsDeleteClicked(true);
	}

	const handleModifyClicked = async (event) => {
		const id = event.target.id;
		const response = await workoutAPI.get(`/${id}`);
		const fitData = { ...workout_data, ...response.data };
		setWorkout(fitData);
		setIsModifyClicked(true);
		setWorkoutId(id);
	}

	const handleAddClicked = (event) => {
		setIsAddClicked(true);
	}



	/**
	 *	Handler : Navigating page
	 */
	const handleNavigatePage = async (event) => {
		const page = (event.target.id === 'prevPage' ? currentPage - 1 : currentPage + 1);
		if (page === 0)
			return;
		const response = await workoutAPI.get(`/list/${page}`);
		//axios로부터 return 받은 값이 NULL (읽지못함)일때, currentPage와 Batch Update 안함
		if (response.data.length === 0) {
			return;
		}
		//axios로부터 return 받았을때
		setWorkoutBatch(response.data);
		setCurrentPage(page);
	}

	/**
	 * UseEffect When Rendering.
	 * fetch workout BATCH from backend
	 */

	React.useEffect(() => {
		loadWorkoutBatch(1);
	}, [])

	/*	CHECKING workout */
	React.useEffect(() => {
		console.log(workout);
	}, [workout])

	/**
	 * For memo
	 */


	//이미지상단에띄우는기능..?
	return (
		<Card>
			<HeaderCard title={props.title} />
			{isInquiryClicked &&
				<Modal>
					<WorkoutInquiry workout={workout} onClose={handleModalClose} />
				</Modal>
			}
			{isDeleteClicked &&
				<Modal>
					<WorkoutDelete id={workoutId} onClose={handleModalClose} />
				</Modal>
			}
			{isAddClicked &&
				<Modal>
					<WorkoutAdd onClose={handleModalClose} />
				</Modal>
			}
			{/*이미지 상단에 띄우기*/}
			{isModifyClicked &&
				<Modal>
					<WorkoutModify workout={workout} id={workoutId} onClose={handleModalClose} />
				</Modal>
			}
			<table>
				{makeTableHead(workout_data)}
				{makeTableBodyElements()}
			</table>
			<footer>
				<Button id="prevPage" onClick={handleNavigatePage}>Prev</Button>
				<Button id="nextPage" onClick={handleNavigatePage}>Next</Button>
				<Button id="add" onClick={handleAddClicked}>추가</Button>
			</footer>
		</Card>
	);
};

export default Manage_Workout;
