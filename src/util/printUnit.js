


export const printUnit = (str) => {

	const tab = "\t";

	switch (str) {
		case "price" :
			return (tab + "	￦");
		case "height" :
			return ("cm");
		case "weight" :
			return ("kg");
		case "upperBodyFat" :
		case "lowerBodyFat" :
		case "upperMuscleMass" :
		case "lowerMuscleMass" :
			return ("%");

		default :
			return "";
	}
}


/**
 * supplementType	Protein
englishName	(MY PROTEIN) impact WHEY PROTEIN
koreanName	(마이 프로틴) 임팩트 웨이 프로틴
price	20900
servings	40
description	웨이 프로틴은 농축 유청 단백질로 구성되어 있으며, 서빙당 21g의 단백질을 함유하고 있어 근육의 성장 및 유지에 기여합니다. 또한 무맛 기준으로 1회 제공량당 103칼로리입니다. 본 제품은 복합 아미노산의 성격을 가지고 있으며 모든 필수 아미노산을 제공 (EAA's) 하고 있어 운동 목표에 상관 없이 모두에게 잘 맞는 제품입니다.
marketURL	test
flavor	무맛
source	유청 단백질(우유)
proteinPerServing	21
fatPerServing	1.9
 */
