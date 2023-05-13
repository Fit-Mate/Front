import React from "react";
import WorkoutLog from "./WorkoutLog";
import SupplementLog from "./SupplementLog";

const ShowHistory = (props) => {
	return (
		<div>
			<header>
				<p>ShowHistory</p>
			</header>
			<WorkoutLog />
			<SupplementLog />
		</div>
	);

};

export default ShowHistory;
