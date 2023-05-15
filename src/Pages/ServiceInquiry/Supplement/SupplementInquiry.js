import React, { useState, useEffect } from "react";
import { userSupplementImageAPI } from "../../../API/API";
import Button from "../../../UI/Button";
import { Buffer } from "buffer";
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
	const description = entries.map((entry) => {
		return (
			<li key={entry[0]}>{`${entry[0]}: ${entry[1]}`}</li>
		)
	});

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
			<p>image</p>
			<img width="100" height="100" src={supplementImage} />
			<ul>
				{description}
			</ul>

			<Button onClick={handleModalClose}>닫기</Button>
		</div >

	);
};

export default SupplementInquiry;
