import React from "react";
import axios from "axios";

/** datatype */
import deepCopy, { workoutRecommendHistory_data } from "../../../DataTypes/data-types";

/** API */
import { recommendWorkoutHistoryAPI } from "../../../API/API";

/** css */
import classes from "../../../Manage/css/Mange_Table.module.css";

/** Component */
import WorkoutHistories from "./WorkoutHistories";

/** UI */
import Card, { HeaderCard } from "../../../UI/Card";
import Button from "../../../UI/Button"

const WorkoutLog = (props) => {

	/**
	 * Non State
	 */
	const dummy_bodyPart_type = deepCopy(workoutRecommendHistory_data);
	/**
	 * State
	 * naviageButtonClicked===1:next, === -1:prev ===0:notClicked
	 */

	const [recommendationHistoryBatch, setRecommendationHistoryBatch] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [isInquiryClicked, setIsInquiryClicked] = React.useState(false);
	const [recommendHistory, setRecommendHistory] = React.useState([]);


	/**
	 * Functions
	 */

	//list가 없을 경우에는...?
	//value가 없다면 default value로 초기화
	const loadRecommendationHistoryBatch = async () => {
		const workoutHistoryBatchResponse = await recommendWorkoutHistoryAPI.get(`list/${currentPage}`);

		const fitData = workoutHistoryBatchResponse.data.map((obj) => {
			return {
				...workoutRecommendHistory_data,
				...obj
			}
		});
		setRecommendationHistoryBatch(fitData);
	}

	/**
	 * Rendering Function
	 */
	//Batch가 아닌 Batch의 object 하나만 받음.
	const makeTableHead = () => {
		return (
			<thead>
				<tr>
					<th>id</th>
					<th>date</th>
					<th>상세보기</th>
				</tr>
			</thead>
		);
	}

	const makeTableBodyElements = () => {
		const columns = recommendationHistoryBatch.map((history) => {
			return (
				<tr key={history.recommendId}>
					<td>{history.recommendId}</td>
					<td>{history.date}</td>
					<td>
						<Button id={history.recommendId} onClick={handleInquiryClicked}>상세보기</Button>
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

		const response = await recommendWorkoutHistoryAPI.get(`${id}`);
		const fitData = { ...workoutRecommendHistory_data, ...response.data };
		setRecommendHistory(fitData);
		setIsInquiryClicked(true);
	}

	/**
	 *	Handler : Navigating page
	 */
	const handleNavigatePage = async (event) => {
		const page = (event.target.id === 'prevPage' ? currentPage - 1 : currentPage + 1);
		if (page === 0)
			return;
		const response = await recommendWorkoutHistoryAPI.get(`/list/${page}`);
		//axios로부터 return 받은 값이 NULL (읽지못함)일때, currentPage와 Batch Update 안함
		if (response.data.length === 0) {
			return;
		}
		//axios로부터 return 받았을때
		setRecommendationHistoryBatch(response.data);
		setCurrentPage(page);
	}

	/**
	 * UseEffect When Rendering.
	 * fetch bodyPart BATCH from backend
	 */
	React.useEffect(() => {
		loadRecommendationHistoryBatch(1);
	}, [])

	//이게 왜 필요한거죠
	React.useEffect(() => {
		loadRecommendationHistoryBatch(1);
	}, [isInquiryClicked]);

	//이미지상단에띄우는기능..?
	return (
		<Card>
			<header>
				<h2>WorkoutRecommendationHistory</h2>
			</header>
			<div>
				<div className={classes["table-align"]}>
					<table>
						{makeTableHead(workoutRecommendHistory_data)}
						{makeTableBodyElements()}
					</table>
				</div>
				<footer>
					<Button id="prevPage" onClick={handleNavigatePage}>Prev</Button>
					<Button id="nextPage" onClick={handleNavigatePage}>Next</Button>
				</footer>
				{isInquiryClicked &&
					<WorkoutHistories recommendHistory={recommendHistory} setIsInquiryClicked={setIsInquiryClicked} />
				}
			</div>
		</Card>
	);
};

export default WorkoutLog;

