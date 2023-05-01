import React from "react";
import Manage_Supplement from "./Supplement/Manage_Supplement";
import Manage_BodyPart from "./BodyPart/Manage_BodyPart";
import Manage_Workout from "./Workout/Manage_Workout";

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

	return (
		<div>
			<article>
				<Manage_Supplement title="Supplement" />
			</ article>
			{br4()}
			<article>
				<Manage_BodyPart title="BodyPart" />
			</article>
			{br4()}
			<article>
				<Manage_Workout title="Workout" />
			</article>
		</div>
	);
};


export default Manage_Main;
