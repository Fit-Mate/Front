import React from "react";
import Modal from "../../UI/Modal";

/**
 *
 * @param {*} props :recentBodyData, setIsShowRecentBodyDataClicked
 * @returns
 */
const RecentBodyDataModal = (props) => {
	const recentBodyData = props.recentBodyData;

	return (
		<Modal>
			<header>
				<h2>RecentBodyDataModal</h2>
			</header>
			<section>
				<div>
					{`Date: ${recentBodyData.date}`}
				</div>
				<div>
					{`height: ${recentBodyData.height}`}
				</div>
				<div>
					{`weight: ${recentBodyData.weight}`}
				</div>
				<div>
					{`upperBodyFat: ${recentBodyData.upperBodyFat}`}
				</div>
				<div>
					{`lowerBodyFat: ${recentBodyData.lowerBodyFat}`}
				</div>
				<div>
					{`upperMuscleMass: ${recentBodyData.upperMuscleMass}`}
				</div>
				<div>
					{`lowerMuscleMass: ${recentBodyData.lowerMuscleMass}`}
				</div>
			</section>
			<footer>
				<button onClick={e => props.setIsShowRecentBodyDataClicked(false)}>닫기</button>
			</footer>
		</Modal>
	);

};

export default RecentBodyDataModal;
