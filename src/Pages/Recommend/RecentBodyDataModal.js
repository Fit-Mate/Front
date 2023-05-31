import React from "react";
import Modal from "../../UI/Modal";

import Button from "../../UI/Button";
import classes from "./RecentBodyData.module.css";

import Card from "../../UI/Card";
import { printUnit } from "../../util/printUnit";


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
								<td className={`${classes.val} ${val}`}>{val}	{printUnit(key)}</td>
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
		<Card>
			<header className={classes.RecentBodyDataModal}>
				<h2>최근 운동 이력</h2>
			</header>
			<main>
				<ShowTable recentBodyData={recentBodyData} />
			</main>
			<footer>
			</footer>
		</Card>
	);

};

export default RecentBodyDataModal;
