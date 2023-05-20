import React from "react";
import axios from "axios";

import deepCopy, { machine_data } from "../../DataTypes/data-types";
import { machineAPI } from "../../API/API";
import classes from "../css/Manage_Supplement.module.css";

import MachineInquiry from "./MachineInquiry";
import MachineModify from "./MachineModify";
import MachineDelete from "./MachineDelete";
import MachineAdd from "./MachineAdd";

import Modal from "../../UI/Modal";
import Card, { HeaderCard } from "../../UI/Card";
import Button from "../../UI/Button";


const Manage_Machine = (props) => {

	/**
	 * Non State
	 */
	const dummy_machine_data = deepCopy(machine_data);
	/**
	 * State
	 *
	 * naviageButtonClicked===1:next, === -1:prev ===0:notClicked
	 */

	const [machineBatch, setMachineBatch] = React.useState([]);
	const [machine, setMachine] = React.useState(machine_data);
	const [machineId, setMachineId] = React.useState('');
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
	const loadMachineBatch = async () => {
		const machineResponse = await machineAPI.get(`/list/${currentPage}`);
		const fitData = machineResponse.data.map((obj) => {
			return {
				...machine_data,
				...obj,
			}
		})
		setMachineBatch(fitData);
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
					<th>bodyPartKoreanName</th>
					<th>조회</th>
					<th>수정</th>
					<th>삭제</th>
				</tr>
			</thead>
		);
	}

	const makeTableBodyElements = () => {
		const columns = machineBatch.map((machine) => {
			return (
				<tr key={machine.id}>
					<td>{machine.englishName}</td>
					<td>{machine.koreanName}</td>
					<td>{bodyPartListToStringWithNewlines(machine.bodyPartKoreanName)}</td>
					<td>
						<Button id={machine.id} onClick={handleInquiryClicked}>조회</Button>
					</td>
					<td>
						<Button id={machine.id} onClick={handleModifyClicked}>수정</Button>
					</td>
					<td>
						<Button id={machine.id} onClick={handleDeleteClicked}>삭제</Button>
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
		const response = await machineAPI.get(`/${id}`);
		const fitData = { ...machine_data, ...response.data };
		setMachine(fitData);
		setIsInquiryClicked(true);
	}

	const handleDeleteClicked = (event) => {
		setMachineId(() => event.target.id);
		setIsDeleteClicked(true);
	}

	const handleModifyClicked = async (event) => {
		const id = event.target.id;
		const response = await machineAPI.get(`/${id}`);
		const fitData = { ...machine_data, ...response.data };
		setMachine(fitData);
		setIsModifyClicked(true);
		setMachineId(id);
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
		const response = await machineAPI.get(`/list/${page}`);
		//axios로부터 return 받은 값이 NULL (읽지못함)일때, currentPage와 Batch Update 안함
		if (response.data.length === 0) {
			return;
		}
		//axios로부터 return 받았을때
		setMachineBatch(response.data);
		setCurrentPage(page);
	}

	/**
	 * UseEffect When Rendering.
	 * fetch machine BATCH from backend
	 */

	React.useEffect(() => {
		loadMachineBatch(1);
	}, []);

	React.useEffect(() => {
		loadMachineBatch(1);
	}, [isAddClicked, isDeleteClicked, isInquiryClicked, isModifyClicked]);


	/**
	 * For memo
	 */

	//이미지상단에띄우는기능..?
	return (
		<Card>
			<HeaderCard title={props.title} />
			{isInquiryClicked &&
				<Modal>
					<MachineInquiry machine={machine} onClose={handleModalClose} />
				</Modal>
			}
			{isDeleteClicked &&
				<Modal>
					<MachineDelete id={machineId} onClose={handleModalClose} />
				</Modal>
			}
			{isAddClicked &&
				<Modal>
					<MachineAdd onClose={handleModalClose} />
				</Modal>
			}
			{/*이미지 상단에 띄우기*/}
			{isModifyClicked &&
				<Modal>
					<MachineModify machine={machine} id={machineId} onClose={handleModalClose} />
				</Modal>
			}
			<table>
				{makeTableHead(machine_data)}
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

export default Manage_Machine;
