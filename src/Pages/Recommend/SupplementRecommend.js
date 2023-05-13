import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";
import { bodyDataAPI, recommendAPI } from "../../API/API";


/**
 *
 * @param {*} props : 	supplementRecommendationId isSubmitClicked
 * @returns
 */
const SupplementRecommend = (props) => {

	/**nonState */
	let checkedPurposeList = [];

	/**state */
	const [budget, setBudget] = useState(0);
	const [purpose, setPurpose] = useState(0);
	const [checkedPurposeState, setCheckedPurposeState] = useState([]);

	const [isShowRecentBodyDataClicked, setIsShowRecentBodyDataClicked] = useState(false);
	const [recentBodyData, setRecentBodyData] = useState({});

	const handleClose = () => {
		props.setIsSubmitClicked(false);
	}

	/**API */
	const getRecentBodyData = async () => {
		const recentResponse = await bodyDataAPI.get("/recent");
		setRecentBodyData(recentResponse.data);
	}

	const getPurpose =  async () => {
		const purposeResponse = await recommendAPI.get("/supplement/purposes");
		const requestedData = purposeResponse.purpose;
		setPurpose(requestedData);
	}


	/**useEffect */
	useEffect(() => {
		getRecentBodyData();
		getPurpose();
	}, []);

	useEffect(() => {

	}, )


	return (
		<Card>
			<p>SupplementRecommend</p>

			<button onClick={handleClose}>닫기</button>
		</Card>
	);

};

export default SupplementRecommend;
