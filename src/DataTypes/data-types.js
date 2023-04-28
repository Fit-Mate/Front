
export const supplement_type = {
	id: 0,
	englishName: "",
	koreanName: "",
	price: 0,
	servings: 0.0,
	description: "",
	supplementType: "",
	marketURL: "",
	flavor: "",

	source: "",
	protienPerServing: 0.0,
	fatPerServing: 0.0,
	carbohydratePerServing: 0.0,
}

const deepCopy = (obj) => {
	JSON.parse(JSON.stringify(obj));
}

export default deepCopy;
