import React from "react";
import { bodyPartAPI, bodyPartPostAPI } from "../API/API";

const randomEnglsihNameGenerator = (num) => {
	let eName = '';
	for (let i = 0; i < num; i++){
		const random = Math.floor(Math.random() * 27);
		eName += String.fromCharCode(97 + random);
	};
	bool = (Math.floor(Math.random) % 2 === 0) ? true : false
	let kName = require("korean-name-generator").generate(bool);
	return [eName, kName];
}

export const insertBodyTypes = () => {
	let step;
	let bool;
	for (step =0; step < 23; step++){
		const [eName, kName] = randomNameGenerator(Math.floor(Math.random() * 8));

		const bodyPart = {
			englishName: eName,
			koreanName: kName,
		}
	}
	bodyPartPostAPI.post("", bodyPart);
}
