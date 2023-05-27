import React, { useEffect, useState } from "react";
import Button from "../../UI/Button";
import SupplementRecommendForm from "./SupplementRecommendForm";
import ExerciseRecommend from "./ExerciseRecommend";
import ExerciseRecommendForm from "./ExerciseRecommendForm";
import classes from "./Recommend.module.css"
import RecentBodyDataModal from "./RecentBodyDataModal";

import { bodyDataAPI } from "../../API/API";

//상단 버튼 두개를 누르면 둘 중 하나가 보이는걸로 결정.
const RecommendForm = (props) => {

	const [isSomethingClicked, setIsSomethingClicked] = useState(null);

	const [recentBodyData, setRecentBodyData] = useState({});
	const getRecentBodyData = async () => {
		const recentResponse = await bodyDataAPI.get("/recent");
		setRecentBodyData(recentResponse.data);
	}

	useEffect(() => {
		getRecentBodyData();
	}, [])


	return (
		<div>
			<div >
				<div className={classes.card}>
					<RecentBodyDataModal
						recentBodyData={recentBodyData}
					/>
				</div>
				<div >
					<Button onClick={e => setIsSomethingClicked("Supplement")}>보조제 추천받기</Button>
					<Button onClick={e => setIsSomethingClicked("Workout")}>운동 추천받기</Button>
				</div>
				{
					isSomethingClicked === "Supplement" &&
					<SupplementRecommendForm />
				}
				{
					isSomethingClicked === "Workout" &&
					<ExerciseRecommendForm />
				}

			</div>
		</div>

	);

};

export default RecommendForm;
