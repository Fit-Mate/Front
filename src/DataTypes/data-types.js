
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
	bodyPartKoreanName: "",
	image: new File([""], "instantiateFile"),
}

const deepCopy = (obj) => {
	JSON.parse(JSON.stringify(obj));
}

export default deepCopy;


