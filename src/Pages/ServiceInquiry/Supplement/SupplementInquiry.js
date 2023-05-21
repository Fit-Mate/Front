import React, { useState, useEffect } from "react";
import { userSupplementImageAPI } from "../../../API/API";
import Button from "../../../UI/Button";
import { Buffer } from "buffer";

import classes from "../Inquiry.module.css";

const ElementTable = (props) => {
	const entries = props.entries.slice(1, -1);

	return (
		<table className={classes.Table}>
			{entries.map((keyval) => {
				const [key, val] = keyval;
				return (
					<tr>
						<td className={classes.key}>{key}</td>
						<td>{val}</td>
					</tr>
				)
			})}
		</table>
	);
}
/**
 * @param {*} props : supplement, handleModalClose
 */

const SupplementInquiry = (props) => {

	const [supplementImage, setSupplementImage] = useState(null);

	const supplement = { ...props.supplement };
	const entries = Object.entries(supplement).filter(([key, value]) => (value !== 0 && value !== null));

	const handleModalClose = (event) => {
		props.onClose();
	}

	//entries를 format하기

	/**function */
	const getSupplementInfo = async () => {
		const imageRes = await userSupplementImageAPI.get(`/image/${supplement['id']}`);
		let result = (imageRes && imageRes.data) || [];
		let base64ImageString = Buffer.from(imageRes.data, 'binary').toString('base64');
		let srcValue = `data:${imageRes.headers["Content-Type"]};base64,${base64ImageString}`;
		setSupplementImage(srcValue);
	}

	/**useEffect */
	useEffect(() => {
		getSupplementInfo();
	}, [])




	return (
		<div>
			<header className={classes.inquiryModalHeader}>
				<div>
					<h2>{supplement.koreanName}</h2>
				</div>
			</header>
			<main>
				<div className={classes.imageContainer}>
					<p>image</p>
					<img width="100" height="100" src={supplementImage} />
				</div>
				<ul>
					<ElementTable entries={entries} />
				</ul>

				<Button onClick={handleModalClose}>닫기</Button>
			</main>
		</div >

	);
};

export default SupplementInquiry;
