import React from "react";
import MemberInfo from "./MemberProfile/MemberInfo";
import MemberBodyDataSummary from "./MemberProfile/MemberBodyDataSummary";

const MemberProfile = (props) => {
	return (
		<div>
			<header>
				<p>Memberprofile</p>
			</header>
			<main>
				<MemberInfo />
			</main>
			<footer>
				<MemberBodyDataSummary />
				{/* NavLnk to bodydataPage */}
			</footer>
		</div>

	);

};

export default MemberProfile;
