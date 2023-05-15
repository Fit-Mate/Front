import React from "react";
import ShowWorkoutInquiry from "./Workout/ShowWorkoutInquiry";
import ShowSupplementInquiry from "./Supplement/ShowSupplementInquiry";

//상단 버튼 두개를 누르면 둘 중 하나가 보이는걸로 결정.
const Inquiry = (props) => {
	return (
		<div>
			<p>Inquiry</p>
			<ShowSupplementInquiry />
			{/*<ShowWorkoutInquiry />*/}
		</div>

	);

};

export default Inquiry;
