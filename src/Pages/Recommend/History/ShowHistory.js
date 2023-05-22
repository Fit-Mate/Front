import React from "react";
import WorkoutLog from "./WorkoutLog";
import SupplementLog from "./SupplementLog";

import classes from "./ShowHistory.module.css";

const ShowHistory = (props) => {
	return (
		<div className={classes.ShowHistory}>
			<header>
			</header>
			<WorkoutLog />
			<SupplementLog />
		</div>
	);

};

export default ShowHistory;
