import React from "react";
import axios from "axios";

const allBPartURI = "admin/bodyParts/list?cookie={}";

const getPageFirstIndex = (currentPage) => {
	return ((currentPage - 1) * 10);
}

const getPageLastIndex = (currentPage) => {
	return (currentPage * 10 - 1);
}

//Batch가 아닌 Batch의 object 하나만 받음.
const makeTableHead = (obj) => {
	const keys = object.keys();
	const tablehead = keys.map((key) => {
		<th>{key}</th>
	});
	return tablehead;
};

const makeTableRow = (obj) => {

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
	const [bPartArray, setBPartArray] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(1);
	cosnt [navigateButtonClicked, setNaviageButtonClicked] = React.useState(0);

	/**
	 * Functions
	 * getAllBPart : 운동정보 데이터 모두 fetch
	 */

	const getAllBPart = async () => {
		const movies = await axios.get(allBPartURI);
		setBPartArray(movies);
	}


	/**
	 * UseEffect When Rendering.
	 * fetch data from backend
	 * setbPartBatch
	 */

	React.useEffect(() => {
		getAllBPart();
		//
	}, [])

	//setCurrentPage for table
	//React.useEffect(() => {
	//}, [bPartArray]);

	//bPartBatch를 currentPage에 대해서 반환.
	React.useEffect(() => {
		const getBPartBatch = (bPartArray, currentPageNum) => {
			if (bPartArray.length < getPageLastIndex(currentPageNum)){
				return bPartArray.slice(getPageFirstIndex(currentPageNum), -1);
			}
			else{
				return bPartArray.slice(getPageFirstIndex, )
			}
		}
		bPartBatch = getBPartBatch(bPartArray, currentPage);
	}, [currentPage]);

	return (
		//table render
		//navigateButton
		<React.fragemnt>

		</React.fragemnt>
	);
};



