import React from "react";
import MemberBodyDataAdd from "./MemberBodyDataAdd";
import MemberBodyDataTable from "./MemberBodyDataTable";

import classes from "./MemberBodyDataSummary.module.css";

/**
 *
 * @param {*} props : onClick(false)
 * @returns
 */
const MemberBodyDataManage = (props) => {

	const [isAddClicked, setIsAddClicked] = React.useState(false);
	return (
		<div className={classes.addSummary}>
			<header>
				<h2>체성분 히스토리 관리</h2>
			</header>
			<main>
				{/* 정보 추가 */}
				<div>
					<MemberBodyDataAdd setIsAddClicked={setIsAddClicked} />
				</div>
				{/* 정보 조회 */}
				<div>
					<MemberBodyDataTable />
				</div>
			</main>
			<footer>
				<button type='button' onClick={e => props.onClick(false)}>닫기</button>
			</footer>
		</div>

	);

};

export default MemberBodyDataManage;
