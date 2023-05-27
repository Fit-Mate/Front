import React from "react";
import axios from "axios";
import { Buffer } from "buffer";

/** data structure */
import deepCopy, { supplement_type } from "../../../DataTypes/data-types";

/**API */
import { supplementAPI, userSupplementAPI, userSupplementImageAPI } from "../../../API/API";

/**css */
import inquiryCSS from "../Inquiry.module.css";

/**Components */
import SupplementInquiry from "./SupplementInquiry";

/**UI */
import Modal from "../../../UI/Modal";
import Card, { HeaderCard } from "../../../UI/Card";
import Button from "../../../UI/Button";
import { FaSearch } from "react-icons/fa";


const ShowSupplementInquiry = (props) => {

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
	const [supplementImageBatch, setSupplementImageBatch] = React.useState({});
	const [currentPage, setCurrentPage] = React.useState(1);
	const [isInquiryClicked, setIsInquiryClicked] = React.useState(false);

	const [inputSupplementSearch, setInputSupplementSeacrh] = React.useState("");
	const [inputSupplementType, setInputSupplementType] = React.useState(null);

	/**
	 * Functions
	 */

	//list가 없을 경우에는...?
	//value가 없다면 default value로 초기화
	const loadSupplementBatch = async () => {
		const supplementResponse = await userSupplementAPI.get(`/list/${currentPage}`);
		const fitData = supplementResponse.data.map((obj) => {
			return {
				...supplement_type,
				...obj,
			}
		})
		setSupplementBatch(fitData);
	}

	const getSupplementInfo = async () => {

		//key만 딱 뽑아서
		const idBatch = supplementBatch.map((supplement) => supplement.id);
		let images = [];
		let promises = [];

		for (let id of idBatch) {
			promises.push(userSupplementImageAPI.get(`/image/${id}`));
		}

		let responses = await Promise.all(promises);
		for (let response of responses) {
			const imageRes = response;
			let result = (imageRes && imageRes.data) || [];
			let base64ImageString = Buffer.from(result, 'binary').toString('base64');
			let srcValue = `data:${imageRes.headers["Content-Type"]};base64,${base64ImageString}`;
			images.push(srcValue);
		}


		//for (let id of idBatch) {
		//	const imageRes = await userSupplementImageAPI.get(`/image/${id}`);
		//	let result = (imageRes && imageRes.data) || [];
		//	let base64ImageString = Buffer.from(result, 'binary').toString('base64');
		//	let srcValue = `data:${imageRes.headers["Content-Type"]};base64,${base64ImageString}`;
		//	images.push(srcValue);
		//}
		setSupplementImageBatch(images);
	}


	/**
	 * Rendering Function
	 */
	//Batch가 아닌 Batch의 object 하나만 받음.
	const makeTableHead = () => {
		return (
			<thead>
				<tr>
					<th>이미지</th>
					<th>이름</th>
					<th>보조제 타입</th>
					<th>가격</th>
					<th>servings</th>
				</tr>
			</thead>
		);
	}

	const makeTableBodyElements = () => {
		const columns = supplementBatch.map((supplement, index) => {
			return (
				<tr key={supplement.id}>
					<td className={inquiryCSS.img}>
						<img src={supplementImageBatch[index]} />
					</td>
					<td className={inquiryCSS.koreanName}>
						<a href="https://" id={supplement.id} onClick={handleInquiryClicked}>
							{supplement.koreanName}
						</a>
					</td>
					<td className={inquiryCSS.other}>{supplement.supplementType}</td>
					<td className={inquiryCSS.other}>{supplement.price}{`\t\u20A9`}</td>
					<td className={inquiryCSS.other}>{supplement.servings}{`\tmg`}</td>
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
		event.preventDefault();
		const id = event.target.id;
		//axios로부터 단건조회API사용.
		const response = await userSupplementAPI.get(`/${id}`);
		const fitData = { ...supplement_type, ...response.data };
		setSupplement(fitData);
		setIsInquiryClicked(true);
	}

	const handleSupplementSearch = async (event) => {
		event.preventDefault();
		const formData = {
			searchKeyword: inputSupplementSearch,
			supplementType: (inputSupplementType === null || inputSupplementType === "all") ? null : [inputSupplementType]
		}
		//axios로부터 단건조회API사용.
		const response = await userSupplementAPI.post(`/search/list/${currentPage}`, formData);



		const fitData = [...response.data];
		setSupplementBatch(fitData);
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
	}, []);

	React.useEffect(() => {
		getSupplementInfo();
	}, [supplementBatch]);


	/*	CHECKING SUPPLEMENT */
	//React.useEffect(()=>{
	//	console.log(supplement);
	//}, [supplement])

	//이미지상단에띄우는기능..?
	return (
		<Card>
			{isInquiryClicked &&
				<Modal>
					<SupplementInquiry supplement={supplement} onClose={handleModalClose} />
				</Modal>
			}

			<Card>
				<form onSubmit={handleSupplementSearch} className={inquiryCSS.searchCard}>
					<label htmlFor="searchSupplement">보조제 검색</label>
					<div className={inquiryCSS.query}>
						<input type='text'
							id="searchSupplement"
							name="searchSupplement"
							value={inputSupplementSearch}
							onChange={e => setInputSupplementSeacrh(e.target.value)}
						/>

						<select id="supplementType"
							name="supplementType"
							onChange={e => setInputSupplementType(e.target.value)}
						>
							<option value={null}>all</option>
							<option value='BCAA'>BCAA</option>
							<option value='Protein'>Protein</option>
							<option value='Gainer'>Gainer</option>
						</select>
					</div>
					<Button type='submit'>search <span><FaSearch /></span></Button>
				</form>
			</Card>

			<table className={inquiryCSS.showtable}>
				{makeTableHead(supplement_type)}
				{makeTableBodyElements()}
			</table>
			<footer>
				<Button id="prevPage" onClick={handleNavigatePage}>Prev</Button>
				<Button id="nextPage" onClick={handleNavigatePage}>Next</Button>
			</footer>
		</Card>
	);
};

export default ShowSupplementInquiry;
