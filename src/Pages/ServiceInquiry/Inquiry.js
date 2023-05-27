import React, { useState } from "react";
import ShowWorkoutInquiry from "./Workout/ShowWorkoutInquiry";
import ShowSupplementInquiry from "./Supplement/ShowSupplementInquiry";
import Button from "../../UI/Button";
import classes from "./Inquiry.module.css";

//상단 버튼 두개를 누르면 둘 중 하나가 보이는걸로 결정.
const Inquiry = (props) => {

	const [isSomethingClicked, setIsSomethingClicked] = useState(null);


	return (
		<div className={classes.inquiryBody}>
			<div className={classes.inquiryButtons}>
				<Button onClick={e => setIsSomethingClicked("Supplement")}>보조제 검색</Button>
				<Button onClick={e => setIsSomethingClicked("Workout")}>운동 검색</Button>
			</div>
				{
					isSomethingClicked === "Supplement" &&
					<ShowSupplementInquiry />
				}
				{
					isSomethingClicked === "Workout" &&
					<ShowWorkoutInquiry />
				}

		</div>

	);

};

export default Inquiry;
