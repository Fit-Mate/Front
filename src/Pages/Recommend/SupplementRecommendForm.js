import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";
import { bodyDataAPI, recommendAPI } from "../../API/API";


/**
 * Rendering Checkbox of BodyPartList Dynamically
 * @param {*} props : handleCheckedListOnChange(position, checkedarray), bodyPartList, checkedBodyPartState
 */
const ShowPurposeCheckBox = (props) => {
	const purposeList = props.purposeList;
	const checkedPurposeState = props.checkedPurposeState;
	const handleCheckedListOnChange = props.handleCheckedListOnChange;

	return (
		<Card>
			<section>
				<ul>
					{purposeList.map((purpose, index) => {
						return (
							<li key={index}>
								<div>
									<input
										type='checkbox'
										id={`purposeCheckbox${index}`}
										name={purpose}
										value={purpose}
										//checked={checkedBodyPartState[index]}
										onChange={() => handleCheckedListOnChange(index, checkedPurposeState, "purpose")}
									/>
									<label htmlFor={`purposeCheckbox${index}`}>{purpose}</label>
								</div>
							</li>
						);
					})}
				</ul>
			</section>
		</Card>
	);
}




/**
 *
 * @param {*} props : 	supplementRecommendationId isSubmitClicked
 * @returns
 */
const SupplementRecommendForm = (props) => {

	/**nonState */

	/**state */
	const [budget, setBudget] = useState(0);
	const [purposeList, setPurposeList] = useState([]);
	const [checkedPurposeState, setCheckedPurposeState] = useState([]);
	const [checkedPurposeList, setCheckedPurposeList] = useState([]);

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

	const getPurposeList = async () => {
		const purposeResponse = await recommendAPI.get("/supplement/purposes");
		const requestedData = purposeResponse.data.purpose;
		setPurposeList(requestedData);
	}

	/**handler*/
	// checkedArray = checekdBodyList, checkedMachineList, checkType: "supplement"
	const handleCheckedListOnChange = (position, checkedArray, checkType) => {
		const updatedCheckedState = checkedArray.map((item, index) =>
			index === position ? !item : item
		);
		if (checkType === "purpose") {
			setCheckedPurposeState(updatedCheckedState);
		}
	};

	const handlePurposeSubmit = (e) => {
		e.preventDefault();

		const recommendationForm = {
			monthlyBudget: budget,
			purpose: purposeList
		}
		const response = recommendAPI.post('supplement');
	}

	/**useEffect */
	useEffect(() => {
		getRecentBodyData();
		getPurposeList();
	}, []);

	useEffect(() => {
		const checkedList = purposeList.filter((list, index) => checkedPurposeState[index]);
		setCheckedPurposeList(checkedList);
	}, [checkedPurposeState])

	//handleCheckedListOnChange(position, checkedarray), bodyPartList, checkedBodyPartState
	return (
		<Card>
			<p>SupplementRecommend</p>

			<form onSubmit={handlePurposeSubmit}>
				<label htmlFor="budget">budget</label>
				<input type='number' id="budget" value={budget} onChange={e => setBudget(e.target.value)} />
				<ShowPurposeCheckBox
					handleCheckedListOnChange={handleCheckedListOnChange}
					checkedPurposeList={checkedPurposeList}
					purposeList={purposeList}
				/>
				<button type='submit'>Submit</button>
			</form>
		</Card>
	);

};

export default SupplementRecommendForm;
