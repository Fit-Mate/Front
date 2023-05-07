import React from "react";
import axios from "axios";

/** datatype */
import deepCopy, { bodyData_data } from "../../DataTypes/data-types";

/** API */
import { bodyDataAPI } from "../../API/API";

/** css */
import classes from "../../Manage/css/Manage_Supplement.module.css"

/** Component */
import BodyDataDelete from "./MemberBodyDataTable/BodyDataDelete";

/** UI */
import Modal from "../../UI/Modal";
import Card, { HeaderCard } from "../../UI/Card";
import Button from "../../UI/Button";

const MemberBodyDataTable = (props) => {

	/**
	 * Non State
	 */
	const dummy_bodyData_type = deepCopy(bodyData_data);
	/**
	 * State
	 * naviageButtonClicked===1:next, === -1:prev ===0:notClicked
	 */

	const [bodyDataBatch, setBodyDataBatch] = React.useState([]);
	const [bodyData, setBodyData] = React.useState(bodyData_data);
	const [bodyDataId, setBodyDataId] = React.useState('');
	const [currentPage, setCurrentPage] = React.useState(1);
	const [isDeleteClicked, setIsDeleteClicked] = React.useState(false);


	/**
	 * Functions
	 */

	//list가 없을 경우에는...?
	//value가 없다면 default value로 초기화
	const loadBodyDataBatch = async () => {
		const bodyDataResponse = await bodyDataAPI.get(`/list/${currentPage}`);
		const fitData = bodyDataResponse.data.map((obj) => {
			return {
				...bodyData_data,
				...obj,
			}
		})
		setBodyDataBatch(fitData);
	}

	/**
	 * Rendering Function
	 */
	//Batch가 아닌 Batch의 object 하나만 받음.
	const makeTableHead = () => {
		return (
			<thead>
				<tr>
					<th>date</th>
					<th>height</th>
					<th>weight</th>
					<th>upperBodyFat</th>
					<th>lowerBodyFat</th>
					<th>upperMuscleMass</th>
					<th>lowerMuscleMass</th>
					<th>삭제</th>
				</tr>
			</thead>
		);
	}

	const makeTableBodyElements = () => {
		const columns = bodyDataBatch.map((bodyData) => {
			return (
				<tr key={bodyData.id}>
					<td>{bodyData.date}</td>
					<td>{bodyData.weight}</td>
					<td>{bodyData.upperBodyFat}</td>
					<td>{bodyData.lowerBodyFat}</td>
					<td>{bodyData.upperMuscleMass}</td>
					<td>{bodyData.lowerMuscleMass}</td>
					<td>
						<Button id={bodyData.id} onClick={handleDeleteClicked}>삭제</Button>
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
		setIsDeleteClicked(false);
	}

	const handleDeleteClicked = (event) => {
		setBodyDataId(() => event.target.id);
		setIsDeleteClicked(true);
	}

	/**
	 *	Handler : Navigating page
	 */
	const handleNavigatePage = async (event) => {
		const page = (event.target.id === 'prevPage' ? currentPage - 1 : currentPage + 1);
		if (page === 0)
			return;
		const response = await bodyDataAPI.get(`/list/${page}`);
		//axios로부터 return 받은 값이 NULL (읽지못함)일때, currentPage와 Batch Update 안함
		if (response.data.length === 0) {
			return;
		}
		//axios로부터 return 받았을때
		setBodyDataBatch(response.data);
		setCurrentPage(page);
	}

	/**
	 * UseEffect When Rendering.
	 * fetch bodyData BATCH from backend
	 */

	React.useEffect(() => {
		loadBodyDataBatch(1);
	}, [])

	React.useEffect(() => {
		loadBodyDataBatch(1);
	}, [isDeleteClicked]);


	/*	CHECKING bodyData */
	//React.useEffect(()=>{
	//	console.log(bodyData);
	//}, [bodyData])

	//이미지상단에띄우는기능..?
	return (
		<Card>
			<HeaderCard title="bodyData" />
			{isDeleteClicked &&
				<Modal>
					<BodyDataDelete id={bodyDataId} onClose={handleModalClose} />
				</Modal>
			}
			<div className={classes["table-align"]}>
				<table>
					{makeTableHead(bodyData_data)}
					{makeTableBodyElements()}
				</table>
			</div>
			<footer>
				<Button id="prevPage" onClick={handleNavigatePage}>Prev</Button>
				<Button id="nextPage" onClick={handleNavigatePage}>Next</Button>
			</footer>
		</Card>
	);
};

export default MemberBodyDataTable;

