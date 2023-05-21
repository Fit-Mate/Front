import React from "react";
import Modal from "../../UI/Modal";

import Button from "../../UI/Button";
import classes from "./RecentBodyData.module.css";


const ShowTable = (props) => {

	delete props.recentBodyData.bodyDataId;
	const entries = Object.entries(props.recentBodyData);

	return (
		<div>
			<table className={classes.BodyDataTable}>
				{
					entries.map(([key, val], index) => {
						return (
							<tr key={index}>
								<td className={`${classes.key} ${key}`}>{key}</td>
								<td className={`${classes.val} ${val}`}>{val}</td>
							</tr>
						);
					})
				}
			</table>
		</div>
	);
}

/**
 *
 * @param {*} props :recentBodyData, setIsShowRecentBodyDataClicked
 * @returns
 */
const RecentBodyDataModal = (props) => {
	const recentBodyData = props.recentBodyData;

	return (
		<Modal>
			<header className={classes.RecentBodyDataModal}>
				<h2>RecentBodyDataModal</h2>
			</header>
			<main>
				<ShowTable recentBodyData={recentBodyData} />
			</main>
			<footer>
				<Button onClick={e => props.setIsShowRecentBodyDataClicked(false)}>닫기</Button>
			</footer>
		</Modal>
	);

};

export default RecentBodyDataModal;
