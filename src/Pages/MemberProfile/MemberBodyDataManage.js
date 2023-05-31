import React from "react";
import MemberBodyDataAdd from "./MemberBodyDataAdd";
import MemberBodyDataTable from "./MemberBodyDataTable";

import classes from "./MemberBodyDataSummary.module.css";
import Button from "../../UI/Button";

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
				<h2>체성분 기록 관리</h2>
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
			<footer >
				<div className={classes.footer}>
					<Button type='button' onClick={e => props.onClick(false)}>닫기</Button>
				</div>
			</footer>
		</div>

	);

};

export default MemberBodyDataManage;
