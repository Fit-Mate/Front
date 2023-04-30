import React from "react";
import axios from "axios";

import deepCopy, { bodyPart_data } from "../../DataTypes/data-types";
import { bodyPartAPI } from "../../API/API";
import classes from "../css/Manage_bodyPart.module.css";

import BodypartInquiry from "./BodyPartInquiry";
//import BodyPartModify from "./BodyPartModify";
//import BodyPartDelete from "./BodyPartDelete";
//import BodyPartAdd from "./BodyPartAdd";

import Modal from "../../UI/Modal";

const Manage_BodyPart = () => {

	/**
	 * Non State
	 */
	const dummy_bodyPart_type = deepCopy(bodyPartId);
	/**
	 * State
	 *
	 * naviageButtonClicked===1:next, === -1:prev ===0:notClicked
	 */

	const [bodyPartBatch, setBodyPartBatch] = React.useState([]);
	const [bodyPart, setBodyPart] = React.useState(bodyPart_data);
	const [bodyPartId, setBodyPartId] = React.useState('');
	const [currentPage, setCurrentPage] = React.useState(1);
	const [isInquiryClicked, setIsInquiryClicked] = React.useState(false);
	const [isDeleteClicked, setIsDeleteClicked] = React.useState(false);
	const [isModifyClicked, setIsModifyClicked] = React.useState(false);
	const [isAddClicked, setIsAddClicked] = React.useState(false);


	/**
	 * Functions
	 */

	//list가 없을 경우에는...?
	//value가 없다면 default value로 초기화
	const loadBodyPartBatch = async () => {
		const bodyPartResponse = await bodyPartAPI.get(`/list/${currentPage}`);
		const fitData = bodyPartResponse.data.map((obj) => {
			return {
				...bodyPart_data,
				...obj,
			}
		})
		setBodyPartBatch(fitData);
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
				</tr>
			</thead>
		);
	}

	const makeTableBodyElements = () => {
		const columns = bodyPartBatch.map((bodyPart) => {
			return (
				<tr key={bodyPart.id}>
					<td>{bodyPart.englishName}</td>
					<td>{bodyPart.koreanName}</td>
					<td>
						<button id={bodyPart.id} onClick={handleInquiryClicked}>조회</button>
					</td>
					<td>
						<button id={bodyPart.id} onClick={handleModifyClicked}>수정</button>
					</td>
					<td>
						<button id={bodyPart.id} onClick={handleDeleteClicked}>삭제</button>
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
		const response = await bodyPartAPI.get(`/${id}`);
		const fitData = { ...bodyPart_data, ...response.data };
		setBodyPart(fitData);
		setIsInquiryClicked(true);
	}

	const handleDeleteClicked = (event) => {
		setbodyPartId(() => event.target.id);
		setIsDeleteClicked(true);
	}

	const handleModifyClicked = async (event) => {
		const id = event.target.id;
		const response = await BodypartAPI.get(`/${id}`);
		const fitData = { ...bodyPart_data, ...response.data };
		setbodyPart(fitData);
		setIsModifyClicked(true);
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
		const response = await bodyPartAPI.get(`/list/${page}`);
		//axios로부터 return 받은 값이 NULL (읽지못함)일때, currentPage와 Batch Update 안함
		if (response.data.length === 0) {
			return;
		}
		//axios로부터 return 받았을때
		setBodyPartBatch(response.data);
		setCurrentPage(page);
	}

	/**
	 * UseEffect When Rendering.
	 * fetch bodyPart BATCH from backend
	 */

	React.useEffect(() => {
		loadBodyPartBatch(1);
	}, [])

	/*	CHECKING bodyPart */
	//React.useEffect(()=>{
	//	console.log(bodyPart);
	//}, [bodyPart])

	//이미지상단에띄우는기능..?
	return (
		<React.Fragment>
			{isInquiryClicked &&
				<Modal>
					<BodyPartInquiry bodyPart={bodyPart} onClose={handleModalClose} />
				</Modal>
			}
			{isDeleteClicked &&
				<Modal>
					<BodyPartDelete id={bodyPartId} onClose={handleModalClose} />
				</Modal>
			}
			{isAddClicked &&
				<Modal>
					<BodyPartAdd onClose={handleModalClose} />
				</Modal>
			}
			{/*이미지 상단에 띄우기*/}
			{isModifyClicked &&
				<Modal>
					<BodyPartModify bodyPart={bodyPart} onClose={handleModalClose} />
				</Modal>
			}
			<table>
				{makeTableHead(bodyPart_data)}
				{makeTableBodyElements()}
			</table>
			<footer>
				<button id="prevPage" onClick={handleNavigatePage}>Prev</button>
				<button id="nextPage" onClick={handleNavigatePage}>Next</button>
				<button id="add" onClick={handleAddClicked}>추가</button>
			</footer>
		</React.Fragment>
	);
};

export default Manage_BodyPart;

