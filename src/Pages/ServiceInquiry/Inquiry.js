import React, { useState } from "react";
import ShowWorkoutInquiry from "./Workout/ShowWorkoutInquiry";
import ShowSupplementInquiry from "./Supplement/ShowSupplementInquiry";
import Button from "../../UI/Button";
import classes from "./Inquiry.module.css";

//상단 버튼 두개를 누르면 둘 중 하나가 보이는걸로 결정.
const Inquiry = (props) => {

	const [isSomethingClicked, setIsSomethingClicked] = useState(null);


	return (
		<div>
			<div className={classes.inquiryButtons}>
				<Button onClick={e => setIsSomethingClicked("Supplement")}>Supplement 조희</Button>
				<Button onClick={e => setIsSomethingClicked("Workout")}>Workout 조희</Button>
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
