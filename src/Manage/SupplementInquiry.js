import React from "react";

/**
 * @param {*} props : supplement, handleModalClose
 */
const SupplementInquiry = (props) => {

	const supplement = { ...props.supplement };
	const entries = Object.entries(supplement).filter(([key, value]) => (value !== 0 && value !== null));

	const handleModalClose = (event) => {
		props.onClose();
	}

	//entries를 format하기
	const description = entries.map((entry) => {
		return (
			<li key={entry[0]}>{`${entry[0]}: ${entry[1]}`}</li>
		)
	});

	return (
		<div>
			<ul>
				{description}
			</ul>

			<button onClick={handleModalClose}>닫기</button>
		</div >

	);
};

export default SupplementInquiry;
