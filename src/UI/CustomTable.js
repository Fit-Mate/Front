import React from "react";
import classes from "./CustomTable.module.css";

export const bodyPartListToStringWithNewlines = (bodyPartKoreanName) => {
	if (bodyPartKoreanName.length === 0)
		return "";

	const bodyPartParagraph = bodyPartKoreanName.reduce((accumulator, currentValue) =>
		`${accumulator}\n${currentValue}`
		, [])
	return bodyPartParagraph;
}

export const ElementTable = (props) => {
	const entries = Object.entries(props.object);

	return (
		<table className={classes.Table}>
			{entries.map( ([key,val], index) => {
				return (
					<tr key={index}>
						<td className={classes.key}>{key}</td>
						<td>{val}</td>
					</tr>
				)
			})}
		</table>
	);
}

const CustomTable = (props) => {
	return (
		<ElementTable object={props.object}/>
	);

};

export default CustomTable;

