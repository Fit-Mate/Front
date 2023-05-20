import React, {useState, useEffect} from "react";

import Button from "../../UI/Button";

import { supplementImageAPI } from "../../API/API";
import { Buffer } from "buffer";

/**
 * @param {*} props : supplement, handleModalClose
 */
const SupplementInquiry = (props) => {

	const supplement = { ...props.supplement };
	const entries = Object.entries(supplement).filter(([key, value]) => (value !== 0 && value !== null));

	const [supplementImage, setSupplementImage] = useState(null);

	/**function */
	const getSupplementInfo = async () => {
		const imageRes = await supplementImageAPI.get(`/image/${supplement.id}`);
		let result = (imageRes && imageRes.data) || [];

		let base64ImageString = Buffer.from(result, 'binary').toString('base64');
		let srcValue = `data:${imageRes.headers["Content-Type"]};base64,${base64ImageString}`;
		setSupplementImage(srcValue);
	}

	useEffect(() => {
		getSupplementInfo();
	}, [])

	const handleModalClose = (event) => {
		props.onClose();
	}

	//entries를 format하기
	const description = entries.map((entry) => {
		return (
			<li key={entry[0]}>{`${entry[0]}: ${entry[1]}`}</li>
		)
	});

	return (
		<div>
			<div>
				<p>image</p>
				<img src={supplementImage} />
			</div>
			<ul>
				{description}
			</ul>

			<Button onClick={handleModalClose}>닫기</Button>
		</div >

	);
};

export default SupplementInquiry;
