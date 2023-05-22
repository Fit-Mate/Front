import React from "react";
import WorkoutLog from "./WorkoutLog";
import SupplementLog from "./SupplementLog";

import classes from "./ShowHistory.module.css";

const ShowHistory = (props) => {
	return (
		<div className={classes.ShowHistory}>
			<header>
			</header>
			<main>
				<div className={classes.ShowHistoryContent}>
					<WorkoutLog />
				</div>
				<div className={classes.ShowHistoryContent}>
					<SupplementLog />
				</div>
			</main>
		</div>
	);

};

export default ShowHistory;
