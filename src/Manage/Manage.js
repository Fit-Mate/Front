import React from "react";
import Manage_Supplement from "./Supplement/Manage_Supplement";
import Manage_BodyPart from "./BodyPart/Manage_BodyPart";

const Manage_Main = (props) => {
	<div>
		<article>
			<Manage_BodyPart />
		</article>

		<article>
			<Manage_Supplement />
		</ article>

	</div>
};

export default Manage_Main;
