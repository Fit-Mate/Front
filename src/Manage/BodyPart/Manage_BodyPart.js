import React from "react";
import axios from "axios";

/** datatype */
import deepCopy, { bodyPart_data } from "../../DataTypes/data-types";

/** API */
import { bodyPartAPI } from "../../API/API";

/** css */
import classes from "../css/Manage_Supplement.module.css";

/** Component */
import BodyPartInquiry from "./BodyPartInquiry";
import BodyPartModify from "./BodyPartModify";
import BodyPartDelete from "./BodyPartDelete";
import BodyPartAdd from "./BodyPartAdd";

/** UI */
import Modal from "../../UI/Modal";
import Card, { HeaderCard } from "../../UI/Card";
import Button from "../../UI/Button";

const Manage_BodyPart = (props) => {

	/**
	 * Non State
	 */
	const dummy_bodyPart_type = deepCopy(bodyPart_data);
	/**
	 * State
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
					<th>조회</th>
					<th>수정</th>
					<th>삭제</th>
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
						<Button id={bodyPart.id} onClick={handleInquiryClicked}>조회</Button>
					</td>
					<td>
						<Button id={bodyPart.id} onClick={handleModifyClicked}>수정</Button>
					</td>
					<td>
						<Button id={bodyPart.id} onClick={handleDeleteClicked}>삭제</Button>
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
		setBodyPartId(() => event.target.id);
		setIsDeleteClicked(true);
	}

	const handleModifyClicked = async (event) => {
		const id = event.target.id;
		const response = await bodyPartAPI.get(`/${id}`);
		const fitData = { ...bodyPart_data, ...response.data };
		setBodyPart(fitData);
		setIsModifyClicked(true);
		setBodyPartId(id);
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

	React.useEffect(() => {
		loadBodyPartBatch(1);
	}, [isAddClicked, isDeleteClicked, isInquiryClicked, isModifyClicked]);


	/*	CHECKING bodyPart */
	React.useEffect(()=>{
		console.log(bodyPart);
	}, [bodyPart])

	//이미지상단에띄우는기능..?
	return (
		<Card>
			<HeaderCard title={props.title} />
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
			{isModifyClicked &&
				<Modal>
					<BodyPartModify bodyPart={bodyPart} id={bodyPartId} onClose={handleModalClose} />
				</Modal>
			}

			<div className={classes["table-align"]}>
				<table>
					{makeTableHead(bodyPart_data)}
					{makeTableBodyElements()}
				</table>
			</div>
			<footer>
				<Button id="prevPage" onClick={handleNavigatePage}>Prev</Button>
				<Button id="nextPage" onClick={handleNavigatePage}>Next</Button>
				<Button id="add" onClick={handleAddClicked}>추가</Button>
			</footer>
		</Card>
	);
};

export default Manage_BodyPart;

