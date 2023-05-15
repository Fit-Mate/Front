import React from "react";

/**
 * @param {*} props : workout, handleModalClose
 */
const WorkoutInquiry = (props) => {

	const workout = { ...props.workout };
	const entries = Object.entries(workout).filter(([key, value]) => (value !== 0 && value !== null));

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

export default WorkoutInquiry;
