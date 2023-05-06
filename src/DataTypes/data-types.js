
export const supplement_type = {
	id: 0,
	supplementType: "",
	englishName: "",
	koreanName: "",
	price: 0,
	servings: 0.0,
	description: "",
	marketURL: "",
	flavor: "",

	source: "",
	protienPerServing: 0.0,
	fatPerServing: 0.0,
	carbohydratePerServing: 0.0,
}

export const bodyPart_data = {
	englishName: "",
	koreanName: "",
}

export const workout_data = {
	englishName: "",
	koreanName: "",
	videoLink: "",
	description: "",
	bodyPartKoreanName: [],
	image: new File([""], "instantiateFile"),
}

export const machine_data = {
	englishName: "",
	koreanName: "",
	bodyPartKoreanName: [],
}

export const bodyData_data = {
	date:"",
	height: 0.0,
	weight: 0.0,
	upperBodyFat: 0.0,
	lowerBodyFat: 0.0,
	upperMuscleMass: 0.0,
	lowerMuscleMass: 0.0
}

const deepCopy = (obj) => {
	JSON.parse(JSON.stringify(obj));
}

export default deepCopy;


