import React from "react";
import { useLocation } from "react-router";

const SupplementRecommendForm = (props) => {

	const location = useLocation();
	const data = location.state.submission;

	return (
		<p>SupplementRecommendForm</p>
	);

};

export default SupplementRecommendForm;
