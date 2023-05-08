import React from "react";
import MemberBodyDataAdd from "./MemberBodyDataAdd";
import MemberBodyDataTable from "./MemberBodyDataTable";

/**
 *
 * @param {*} props : onClick(false)
 * @returns
 */
const MemberBodyDataManage = (props) => {

	const [isAddClicked, setIsAddClicked] = React.useState(false);
	return (
		<div>
			<header>
				<h2>체성분 히스토리 관리</h2>
			</header>
			<main>
				{/* 정보 추가 */}
				<MemberBodyDataAdd setIsAddClicked={setIsAddClicked}/>
				{/* 정보 조회 */}
				<MemberBodyDataTable />
			</main>
			<footer>
				<button type='button' onClick={e => props.onClick(false)}>닫기</button>
			</footer>
		</div>

	);

};

export default MemberBodyDataManage;
