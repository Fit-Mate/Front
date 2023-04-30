import React from "react";
import Manage_Supplement from "./Supplement/Manage_Supplement";
import Manage_BodyPart from "./BodyPart/Manage_BodyPart";

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
				<Manage_Supplement title="Supplement"/>
			</ article>
				{br4()}
			<article>
				<Manage_BodyPart title="BodyPart"/>
			</article>
		</div>
	);
};


export default Manage_Main;
