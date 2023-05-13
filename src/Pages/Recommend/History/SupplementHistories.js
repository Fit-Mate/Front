import React from "react";
import Card from "../../../UI/Card";
import SupplementHistory from "./SupplementHistory";

/**
 *
 * @param {*} props : recommendHistory setIsInquiryClicked
 * @returns
 */


/*
1. recommendHistory:

2. date: "2023-05-13"

3. monthlyBudget: 0

4. question: "suggest up to 3 supplements in this list. For a woman who is 169.0cm tall, weights 100.0kg, has 15.0% upper body fat, 15.0% lower body fat, 15.0% upper body skeletal muscle mass, and 15.0% lower body skeletal muscle mass. Her purpose is gain_muscle and weight_loss. your budget is 0Won."

5. recommendationBody: {id: 0, englishName: '', koreanName: '', price: 0, servings: 0, …}

6. recommendedSupplementList: (3) [{…}, {…}, {…}]

7. supplementRecommendationId: 754
*/
const SupplementHistories = (props) => {

	const recommendHistory = props.recommendHistory;
	const recommendedSupplementList = recommendHistory.recommendedSupplementList;

	return (
		<Card>
			<h3>Detail</h3>
			<ul>
				{recommendedSupplementList.map((history) => {
					return (
					<li key={history.id}>
						<SupplementHistory history={history} />
					</li>
					);
				}
				)}
			</ul>
			<button type='button' onClick={e => props.setIsInquiryClicked(false)}>닫기</button>
		</Card>
	);

};

export default SupplementHistories;
