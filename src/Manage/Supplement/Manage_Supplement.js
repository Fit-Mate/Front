import React from "react";
import axios from "axios";

/** data structure */
import deepCopy, { supplement_type } from "../../DataTypes/data-types";

/**API */
import { supplementAPI } from "../../API/API";

/**css */
import classes from "../css/Manage_Supplement.module.css";

/**Components */
import SupplementInquiry from "./SupplementInquiry";
import SupplementModify from "./SupplementModify";
import SupplementDelete from "./SupplementDelete";
import SupplementAdd from "./SupplementAdd";

/**UI */
import Modal from "../../UI/Modal";
import Card, { HeaderCard } from "../../UI/Card";
import Button from "../../UI/Button";


const Manage_Supplement = (props) => {

	/**
	 * Non State
	 */
	const dummy_supplement_type = deepCopy(supplement_type);
	/**
	 * State
	 *
	 * naviageButtonClicked===1:next, === -1:prev ===0:notClicked
	 */

	const [supplementBatch, setSupplementBatch] = React.useState([]);
	const [supplement, setSupplement] = React.useState(supplement_type);
	const [supplementId, setSupplementId] = React.useState('');
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
						<Button id={supplement.id} onClick={handleInquiryClicked}>조회</Button>
					</td>
					<td>
						<Button id={supplement.id} onClick={handleModifyClicked}>수정</Button>
					</td>
					<td>
						<Button id={supplement.id} onClick={handleDeleteClicked}>삭제</Button>
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
		const response = await supplementAPI.get(`/${id}`);
		const fitData = { ...supplement_type, ...response.data };
		setSupplement(fitData);
		setIsInquiryClicked(true);
	}

	const handleDeleteClicked = (event) => {
		setSupplementId(() => event.target.id);
		setIsDeleteClicked(true);
	}

	const handleModifyClicked = async (event) => {
		const id = event.target.id;
		const response = await supplementAPI.get(`/${id}`);
		const fitData = { ...supplement_type, ...response.data };
		setSupplement(fitData);
		setIsModifyClicked(true);
		setSupplementId(id);
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

	/*	CHECKING SUPPLEMENT */
	//React.useEffect(()=>{
	//	console.log(supplement);
	//}, [supplement])

	//이미지상단에띄우는기능..?
	return (
		<Card>
			<HeaderCard title={props.title} />
			{isInquiryClicked &&
				<Modal>
					<SupplementInquiry supplement={supplement} onClose={handleModalClose} />
				</Modal>
			}
			{isDeleteClicked &&
				<Modal>
					<SupplementDelete id={supplementId} onClose={handleModalClose} />
				</Modal>
			}
			{isAddClicked &&
				<Modal>
					<SupplementAdd onClose={handleModalClose} />
				</Modal>
			}
			{/*이미지 상단에 띄우기*/}
			{isModifyClicked &&
				<Modal>
					<SupplementModify supplement={supplement} id={supplementId} onClose={handleModalClose} />
				</Modal>
			}
			<table>
				{makeTableHead(supplement_type)}
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

export default Manage_Supplement;
