import React from "react";
import axios from "axios";

import deepCopy, { supplement_type } from "../DataTypes/data-types";
import { supplementAPI } from "../API/API";
import classes from "./css/Manage_Supplement.module.css";

import SupplementInquiry from "./SupplementInquiry";
import SupplementModify from "./SupplementModify";
import SupplementDelete from "./SupplementDelete";

import Modal from "../UI/Modal";

const Manage_Supplement = () => {

	/**
	 * Non State
	 */
	const dummy_supplement_type = deepCopy(supplement_type);
	let supplement_id;
	/**
	 * State
	 *
	 * naviageButtonClicked===1:next, === -1:prev ===0:notClicked
	 */

	const [supplementBatch, setSupplementBatch] = React.useState([]);
	const [supplement, setSupplement] = React.useState(supplement_type);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [isInquiryClicked, setIsInquiryClicked] = React.useState(false);
	const [isModifyClicked, setIsModifyClicked] = React.useState(false);
	const [isDeleteClicked, setIsDeleteClicked] = React.useState(false);


	/**
	 * Functions
	 */

	//list가 없을 경우에는...?
	//value가 없다면 default value로 초기화
	const loadSupplementBatch = async () => {
		const supplementResponse = await supplementAPI.get(`/list/${currentPage}`);
		const fitData = supplementResponse.data.map((obj) => {
			return {
				...supplement_type,
				...obj,
			}
		})
		setSupplementBatch(fitData);
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
					<th>price</th>
					<th>servings</th>
					<th>description</th>
					<th>supplementType</th>
					<th>조회</th>
					<th>수정</th>
					<th>삭제</th>
				</tr>
			</thead>
		);
	}

	const makeTableBodyElements = () => {
		const columns = supplementBatch.map((supplement) => {
			return (
				<tr key={supplement.id}>
					<td>{supplement.englishName}</td>
					<td>{supplement.koreanName}</td>
					<td>{supplement.price}</td>
					<td>{supplement.servings}</td>
					<td>{supplement.description}</td>
					<td>{supplement.supplementType}</td>
					<td>
						<button id={supplement.id} onClick={handleInquiryClicked}>조회</button>
					</td>
					<td>
						<button id={supplement.id} onClick={handleModifyClicked}>수정</button>
					</td>
					<td>
						<button id={supplement.id} onClick={handleDeleteClicked}>삭제</button>
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
	}

	const handleInquiryClicked = async (event) => {
		const id = event.target.id;
		console.log(id);
		//axios로부터 단건조회API사용.
		const response = await supplementAPI.get(`/${id}`);
		const fitData = { ...supplement_type, ...response.data };
		setSupplement(fitData);
		setIsInquiryClicked(true);
	}

	const handleModifyClicked = (event) => {
		console.log(event.target.id);
		setIsModifyClicked(true);
	}

	const handleDeleteClicked = (event) => {
		supplement_id = event.target.id;
		setIsDeleteClicked(true);
	}

	/**
	 *	Handler : Navigating page
	 */
	const handleNavigatePage = async (event) => {
		const page = (event.target.id === 'prevPage' ? currentPage - 1 : currentPage + 1);
		if (page === 0)
			return;
		const response = await supplementAPI.get(`/list/${page}`);
		//axios로부터 return 받은 값이 NULL (읽지못함)일때, currentPage와 Batch Update 안함
		if (response.data.length === 0) {
			return;
		}
		//axios로부터 return 받았을때
		setSupplementBatch(response.data);
		setCurrentPage(page);
	}

	/**
	 * UseEffect When Rendering.
	 * fetch SUPPLEMENT BATCH from backend
	 */

	React.useEffect(() => {
		loadSupplementBatch(1);
	}, [])

	//setCurrentPage for table
	//React.useEffect(() => {
	//}, [bPartArray]);


	return (
		<React.Fragment>
			{isInquiryClicked &&
				<Modal>
					<SupplementInquiry supplement={supplement} onClose={handleModalClose} />
				</Modal>
			}
			{/*{isModifyClicked && <Modal><SupplementModify /></Modal>}*/}
			{isDeleteClicked &&
				<Modal>
					<SupplementDelete id={supplement_id} onClose={handleModalClose} />
				</Modal>
			}

			{/*이미지 상단에 띄우기*/}
			{/*{isModifyClicked && <SupplementInputForm onClick={handleClosebPartForm} onSubmit={handleBodyPart}/>}*/}
			<table>
				{makeTableHead(supplement_type)}
				{makeTableBodyElements()}
			</table>
			<footer>
				<button id="prevPage" onClick={handleNavigatePage}>Prev</button>
				<button id="nextPage" onClick={handleNavigatePage}>Next</button>
			</footer>
		</React.Fragment>
	);
};

export default Manage_Supplement;
