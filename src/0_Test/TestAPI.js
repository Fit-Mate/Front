import React from "react";
import axios from "axios";

const allbPartURI = "admin/bodyParts/list?cookie={}";

const getPageFirstIndex = (currentPage) => {
	return ((currentPage - 1) * 10);
}

const getPageLastIndex = (currentPage) => {
	return (currentPage * 10 - 1);
}


const TestAPI = () => {

	/**
	 * Data for Testing
	 */

	/**
	 * Non State
	 */
	const bPartBatchFromTotal = [];


	/**
	 * State
	 *
	 * naviageButtonClicked===1:next, === -1:prev ===0:notClicked
	 */
	const [bPartArray, setbPartArray] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [bPartBatch, setbPartBatch] = React.useState([]);

	/**
	 * Functions
	 * getAllbPart : 운동정보 데이터 모두 fetch
	 */
	const getAllbPart = async () => {
		const response = await axios.get("/admin/supplements/list/1");
		const bPartTotal = response.data;
		setbPartArray(bPartTotal);
		console.log(bPartTotal);
	}

	/**
	 * Rendering Function
	 */
	//Batch가 아닌 Batch의 object 하나만 받음.
	const makeTableHead = (bodyParts) => {
		const keys = bodyParts.keys();
		const tablehead = keys.map((key) => {
			<th>{key}</th>
		});
		return (
			<tr>
				{tablehead}
			</tr>
		);
	};

	const makeTableBodyElements = (bPartBatch) => {
		const columns = bPartBatch.map((bPart) => {
			return (
				<tr>
					<td>{bPart.englishName}</td>
					<td>{bPart.koreanName}</td>
					<td>
						<button id={bPart.id} onClick={handleModifybPart}></button>
					</td>
				</tr>
			);
		})
	};

	/**
	 * Handler
	 */
	const handleModifybPart = (event) => {
		console.log(event.target.id);
	}

	const handleNavigatePage = async (event) => {
		event.preventDefault();
		const page = (event.target.id === 'prev' ? currentPage - 1 : currentPage + 1);
		const data = await axios.get(`/admin/machines/list/${page}?cookie={}`);
		//axios로부터 return 받은 값이 NULL (읽지못함)일때, currentPage와 Batch Update 안함
		if (data === null){
			console.log("couldn't read from database");
			return ;
		}
		//axios로부터 return 받았을때
		setbPartBatch(data);
		setCurrentPage(page);
	}


	/**
	 * UseEffect When Rendering.
	 * fetch data from backend
	 * setbPartBatch
	 */

	React.useEffect(() => {
		getAllbPart();
		//
	}, [])

	//setCurrentPage for table
	//React.useEffect(() => {
	//}, [bPartArray]);

	//모든 bPartBatch를 currentPage에 대해서 반환.
	React.useEffect(() => {
		const getbPartBatchFromTotal = (bPartArray, currentPageNum) => {
			if (bPartArray.length < getPageLastIndex(currentPageNum)) {
				return bPartArray.slice(getPageFirstIndex(currentPageNum), -1);
			}
			else {
				return bPartArray.slice(getPageFirstIndex,)
			}
		}
		//getbPartFromTotal : bPartArray로부터 batch를 만드는 함수
		//bPartBatchFromTotal = getbPartBatchFromTotal(bPartArray, currentPage);
	}, [currentPage]);

	return (
		//table render
		//navigateButton
		<React.Fragment>
			<table>
				{/*{makeTableHead(bPartBatch[0])}
				{makeTableBodyElements()}*/}
			</table>
			<footer>
				<button id="prevPage" onClick={handleNavigatePage}>Prev</button>
				<button id="nextPage" onClick={handleNavigatePage}>Next</button>
			</footer>
		</React.Fragment>
	);
};

export default TestAPI;
