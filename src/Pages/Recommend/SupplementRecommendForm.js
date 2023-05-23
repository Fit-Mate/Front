import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";
import { bodyDataAPI, recommendPostAPI, recommendAPI } from "../../API/API";

import RecentBodyDataModal from "./RecentBodyDataModal";
import { useNavigate } from "react-router-dom";

import Button from "../../UI/Button";
import bodyDataCss from "./RecentBodyData.module.css";
import classes from "./Recommend.module.css";


/**
 * Rendering Checkbox of BodyPartList Dynamically
 * @param {*} props : handleCheckedListOnChange(position, checkedarray), bodyPartList, checkedBodyPartState
 */
const ShowPurposeCheckBox = (props) => {
	const purposeList = props.purposeList;
	const checkedPurposeState = props.checkedPurposeState;
	const handleCheckedListOnChange = props.handleCheckedListOnChange;

	return (
		<section className={classes.formCheckBox}>
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
									checked={checkedPurposeState[index]}
									onChange={() => handleCheckedListOnChange(index, checkedPurposeState, "purpose")}
								/>
								<label htmlFor={`purposeCheckbox${index}`}>{purpose}</label>
							</div>
						</li>
					);
				})}
			</ul>
		</section>
	);
}




/**
 *
 * @param {*} props : 	supplementRecommendationId isSubmitClicked
 * @returns
 */
const SupplementRecommendForm = (props) => {

	/**nonState */
	const navigate = useNavigate();

	/**state */

	const [isNothingClicked, setIsNothingClicked] = useState(false);


	const [budget, setBudget] = useState(0);
	const [purposeList, setPurposeList] = useState([]);
	const [checkedPurposeState, setCheckedPurposeState] = useState([]);
	const [checkedPurposeList, setCheckedPurposeList] = useState([]);
	const [isBothChecked, setIsBothChecked] = useState(false);

	const [isShowRecentBodyDataClicked, setIsShowRecentBodyDataClicked] = useState(false);
	const [isSubmitClicked, setIsSubmitClicked] = useState(false);
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
		const requestedData = purposeResponse.data;
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

		if (checkedPurposeList.length === 0) {
			setIsNothingClicked(true);
			return;
		}
		else {
			setIsNothingClicked(false);
		}

		const recommendationForm = {
			monthlyBudget: budget,
			purpose: checkedPurposeList
		}
		const response = recommendPostAPI.post('/supplement', recommendationForm);

		setIsSubmitClicked(true);
		setBudget(0);
		setCheckedPurposeState(
			new Array(checkedPurposeState.length).fill(false)
		)
	}

	const handleShowRecentBodyDataClicked = () => {
		setIsShowRecentBodyDataClicked(true);
	}


	/**useEffect */
	useEffect(() => {
		getRecentBodyData();
		getPurposeList();
	}, []);

	useEffect(() => {
		setCheckedPurposeState(
			new Array(purposeList.length).fill(false)
		);
	}, [purposeList])

	useEffect(() => {
		const checkedList = purposeList.filter((list, index) => checkedPurposeState[index]);
		setCheckedPurposeList(checkedList);

		if (checkedPurposeState[1] && checkedPurposeState[2]) {
			setIsBothChecked(true);
		}
		else {
			setIsBothChecked(false);
		}

	}, [checkedPurposeState])

	//handleCheckedListOnChange(position, checkedarray), bodyPartList, checkedBodyPartState
	return (
		<div>
			<header>
				<h2>Supplement Recommend</h2>
			</header>
			<main className={classes.RecentBodyData}>
				<Button type='button' onClick={handleShowRecentBodyDataClicked}>최근 인바디 정보 확인</Button>
				{isShowRecentBodyDataClicked &&
					<RecentBodyDataModal
						recentBodyData={recentBodyData}
						setIsShowRecentBodyDataClicked={setIsShowRecentBodyDataClicked}
					/>
				}
				<div className={classes.card}>
					<Card>
						<form onSubmit={handlePurposeSubmit} className={classes.Recommend}>
							<label htmlFor="budget">budget</label>
							<input type='number' id="budget" value={budget} onChange={e => setBudget(e.target.value)} />
							<ShowPurposeCheckBox
								handleCheckedListOnChange={handleCheckedListOnChange}
								checkedPurposeState={checkedPurposeState}
								purposeList={purposeList}
							/>
							{!isBothChecked && <Button type='submit'>Submit</Button>}
							{isBothChecked && <p>Cannot Select Both Of checkbox</p>}
							{isNothingClicked && <p>Nothing Clicked</p>}
						</form>
					</Card>
				</div>
			</main>
			<footer>

			</footer>
		</div>
	);

};

export default SupplementRecommendForm;
