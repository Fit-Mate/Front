import React, { useState } from "react";
import Manage_Supplement from "./Supplement/Manage_Supplement";
import Manage_BodyPart from "./BodyPart/Manage_BodyPart";
import Manage_Workout from "./Workout/Manage_Workout";
import Manage_Machine from "./Machine/Manage_Machine";
import Button from "../UI/Button";

import classes from "./Manage_Main.module.css";

const br4 = () => {
	return (
		<div>
			<br />
			<br />
			<br />
			<br />
		</div>
	);
}

const Manage_Main = (props) => {

	// suppelment, workout, bodyPart, machine
	const [adminOption, setAdminOption] = useState([true, false, false, false]);

	const handleOptionSelect_Supplement = (e) => {
		e.preventDefault();
		setAdminOption([true, false, false, false]);
	}
	const handleOptionSelect_Workout = (e) => {
		e.preventDefault();
		setAdminOption([false, true, false, false]);
	}
	const handleOptionSelect_BodyPart = (e) => {
		e.preventDefault();
		setAdminOption([false, false, true, false]);
	}
	const handleOptionSelect_Machine = (e) => {
		e.preventDefault();
		setAdminOption([false, false, false, true]);
	}



	return (
		<div className={classes.ManageMain}>
			<div>
				<Button type="button" onClick={handleOptionSelect_Supplement}>Supplement</Button>
				<Button type="button" onClick={handleOptionSelect_Workout}>Workout</Button>
				<Button type="button" onClick={handleOptionSelect_BodyPart}>BodyPart</Button>
				<Button type="button" onClick={handleOptionSelect_Machine}>Machine</Button>
			</div>
			<div>
				{
					adminOption[0] &&
					<article>
						<Manage_Supplement title="Supplement" />
					</ article>
				}
				{
					adminOption[2] &&
					<article>
						<Manage_BodyPart title="BodyPart" />
					</article>
				}
				{
					adminOption[1] &&
					<article>
						<Manage_Workout title="Workout" />
					</article>
				}
				{
					adminOption[3] &&
					<article>
						<Manage_Machine title="Machine" />
					</article>
				}
			</div>
		</div>
	);
};


export default Manage_Main;
