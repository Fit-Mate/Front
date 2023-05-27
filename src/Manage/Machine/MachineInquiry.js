import React from "react";
import CustomTable from "../../UI/CustomTable";

/**
 * @param {*} props : machine, handleModalClose
 */
const MachineInquiry = (props) => {

	const machine = { ...props.machine };
	const entries = Object.entries(machine).filter(([key, value]) => (value !== 0 && value !== null));

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
				<CustomTable object={machine}/>
			</ul>

			<button onClick={handleModalClose}>닫기</button>
		</div >

	);
};

export default MachineInquiry;
