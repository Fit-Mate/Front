import React from "react";

/**
 *
 * @param {*} props : supplementHistoryBatch setIsInquiryClicked
 * @returns
 */
const SupplementHistories = (props) => {

	return (
		<Card>
			<ul>
				{props.supplementHistoryBatch.map((history) => {
					<li>
						<SupplementHistory history={history} />
					</li>
				}
				)}
			</ul>
			<button type='button' onClick={e => props.setIsInquiryClicked(false)}>닫기</button>
		</Card>
	);

};

export default SupplementHistories;
