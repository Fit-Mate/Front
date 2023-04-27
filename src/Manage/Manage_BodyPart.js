import React from "react";
import axios from "axios";

const allbPartURI = "admin/bodyParts/list?cookie={}";

const getPageFirstIndex = (currentPage) => {
	return ((currentPage - 1) * 10);
}

const getPageLastIndex = (currentPage) => {
	return (currentPage * 10 - 1);
}


const Manage_BodyPart = () => {
	/**
	 * Non State
	 */
	const bPartBatch = [];


	/**
	 * State
	 *
	 * naviageButtonClicked===1:next, === -1:prev ===0:notClicked
	 */
	const [bPartArray, setbPartArray] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(1);

	/**
	 * Functions
	 * getAllbPart : 운동정보 데이터 모두 fetch
	 */
	const getAllbPart = async () => {
		const movies = await axios.get(allbPartURI);
		setbPartArray(movies);
	}

	/**
	 * Rendering Function
	 */
	//Batch가 아닌 Batch의 object 하나만 받음.
	const makeTableHead = (bodyParts) => {
		const keys = object.keys();
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

	const handleNavigatePage = (event) => {
		if (event.target.id === "prev"){
			if (currentPage === )
		}
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

	//bPartBatch를 currentPage에 대해서 반환.
	React.useEffect(() => {
		const getbPartBatch = (bPartArray, currentPageNum) => {
			if (bPartArray.length < getPageLastIndex(currentPageNum)) {
				return bPartArray.slice(getPageFirstIndex(currentPageNum), -1);
			}
			else {
				return bPartArray.slice(getPageFirstIndex,)
			}
		}
		bPartBatch = getbPartBatch(bPartArray, currentPage);
	}, [currentPage]);

	return (
		//table render
		//navigateButton
		<React.fragemnt>
			<makeTableHead />
			<makeTableBodyElements />
			<button id="prevPage" onClick={handleNavigatePage}>Prev</button>
			<button id="nextPage" onClick={handleNavigatePage}>Next</button>
		</React.fragemnt>
	);
};



