import React from "react";
import axios from "axios";

/** datatype */
import deepCopy, { supplementRecommendationBody, supplementRecommendationBody_data, supplementRecommendHistory_data } from "../../../DataTypes/data-types";

/** API */
import { recommendSupplementHistoryAPI, recommendWorkoutHistoryAPI } from "../../../API/API";

/** css */
import classes from "../../../Manage/css/Mange_Table.module.css";
import historyCss from "./ShowHistory.module.css";

/** Component */
import SupplementHistories from "./SupplementHistories";

/** UI */
import Modal from "../../../UI/Modal";
import Card, { HeaderCard } from "../../../UI/Card";
import Button from "../../../UI/Button"



const SupplementLog = (props) => {

	/**
	 * Non State
	 */
	const dummy_bodyPart_type = deepCopy(supplementRecommendHistory_data);
	/**
	 * State
	 * naviageButtonClicked===1:next, === -1:prev ===0:notClicked
	 */

	const [recommendationHistoryBatch, setRecommendationHistoryBatch] = React.useState([]);
	const [recommendHistoryId, setRecommendHistoryId] = React.useState(0);
	const [recommendHistory, setRecommendHistory] = React.useState({});

	const [currentPage, setCurrentPage] = React.useState(1);
	const [isInquiryClicked, setIsInquiryClicked] = React.useState(false);


	/**
	 * Functions
	 */

	//list가 없을 경우에는...?
	//value가 없다면 default value로 초기화
	const loadRecommendationHistoryBatch = async () => {
		const supplementHistoryBatchResponse = await recommendSupplementHistoryAPI.get(`list/${currentPage}`);

		const fitData = supplementHistoryBatchResponse.data.map((obj) => {
			return {
				...supplementRecommendHistory_data,
				...obj,
				recommendationBody: { ...obj.recommendationBody }
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
					<th className={historyCss.key}>date</th>
					<th className={historyCss.val}>상세보기</th>
				</tr>
			</thead>
		);
	}

	const makeTableBodyElements = () => {
		const columns = recommendationHistoryBatch.map((history) => {
			return (
				<tr key={history.supplementRecommendationId}>
					<td className={historyCss.key}>{history.date}</td>
					<td className={historyCss.val}>
						<Button id={history.supplementRecommendationId} onClick={handleInquiryClicked}>상세보기</Button>
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

		/**
		 * Response Data: data
		 * {date, monthlyBudget, question, recommendedSupplementList(Array)
		 * recommendSupplementList {id, description, englishName, flavor, id, koreanName, koreanRecommendation, price, servings...}
		 *
		 */
		const response = await recommendSupplementHistoryAPI.get(`${id}`);
		const fitData = { ...supplementRecommendHistory_data, ...response.data };
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
		const response = await recommendSupplementHistoryAPI.get(`/list/${page}`);
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
				<h2>SupplementRecommendationHistory</h2>
			</header>
			<div>
				<div className={classes["table-align"]}>
					<table className={historyCss.LogTable}>
						{makeTableHead(supplementRecommendHistory_data)}
						{makeTableBodyElements()}
					</table>
				</div>
				<footer>
					<Button id="prevPage" onClick={handleNavigatePage}>Prev</Button>
					<Button id="nextPage" onClick={handleNavigatePage}>Next</Button>
				</footer>
			</div>
			{isInquiryClicked &&
				<SupplementHistories recommendHistory={recommendHistory} setIsInquiryClicked={setIsInquiryClicked} />
			}

		</Card>
	);
};

export default SupplementLog;

