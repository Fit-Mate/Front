import React from "react";

import { supplementPostAPI } from "../API/API";

import classes from "./css/FormInput.module.css";
import { supplement_type } from "../DataTypes/data-types";


/**
 * Basic elements : englishName, koreanName, description, marketURL, price, servings, id, flavor
 * Supplement Type [Protien] : carbohydratePerServing, source, protienPerServing, fatPerServing
 * Supplement Type [Gainer] : carbohydratePerServing, source, protienPerServing, fatPerServing
 * Supplement Type [BCAA] : flavor
 */


/**
 * @param {*} props : onClose
 */
const SupplementAdd = (props) => {

	const eNameRef = React.useRef("");
	const kNameRef = React.useRef("");
	const descriptionRef = React.useRef("");
	const marketURLRef = React.useRef("");
	const flavorRef = React.useRef("");
	const priceRef = React.useRef(0);
	const servingsRef = React.useRef(0.1);
	const sourceRef = React.useRef("");
	const carbohydratePerServingRef = React.useRef(0.1);
	const proteinPerServingRef = React.useRef(0.1);
	const fatPerServingRef = React.useRef(0.1);

	/**
	 * Non-state var
	 */

	//handleSupplementAdd
	const [submitSupplementType, setSubmitSupplementType] = React.useState("Protein");
	const [imageFile, setImageFile] = React.useState([]);

	/**
	 * Functions
	 */
	const initAllInputRefs = () => {
		console.log(carbohydratePerServingRef);
		console.log(eNameRef);
		console.log(priceRef);
		console.log(submitSupplementType);
		eNameRef.current.value = "";
		kNameRef.current.value = "";
		descriptionRef.current.value = "";
		marketURLRef.current.value = "";
		flavorRef.current.value = "";
		priceRef.current.value = 1;
		servingsRef.current.value = 1.0;
		if (carbohydratePerServingRef.current !== null)
			carbohydratePerServingRef.current.value = 1.0;
		if (protienPerServingRef.current !== null)
			protienPerServingRef.current.value = 1.0;
		if (fatPerServingRef.current !== null)
			fatPerServingRef.current.value = 1.0;
		if (sourceRef.current !== null)
			sourceRef.current.value = "";
		if (carbohydratePerServingRef.current !== null)
			carbohydratePerServingRef.current.value = 1.0;
		if (proteinPerServingRef.current !== null)
			proteinPerServingRef.current.value = 1.0;
		if (fatPerServingRef.current !== null)
			fatPerServingRef.current.value = 1.0;
		if (sourceRef.current !== null)
			sourceRef.current.value = "";
	}

	const appendFormData = (formData, supplementObj) => {
		Object.entries(supplementObj).map(([key, value]) => {
			formData.append(key, value);
		});
	}

	/**
	 * Handler
	*/
	const handleModalClose = (event) => {
		props.onClose();
	}

	const handleSupplementFile = (event) => {
		setImageFile(event.target.files[0]);
	}

	const handleSupplementSubmit = async (event) => {
		event.preventDefault();
		initAllInputRefs();

		const sup = {
			englishName: eNameRef.current.value,
			koreanName: kNameRef.current.value,
			description: descriptionRef.current.value,
			marketURL: marketURLRef.current.value,
			supplementType: submitSupplementType,
			flavor: flavorRef.current.value,
			price: priceRef.current.value *= 1,
			servings: servingsRef.current.value *= 1,
			source: sourceRef.current !== null ? sourceRef.current.value : "",
			carbohydratePerServing: carbohydratePerServingRef.current !== null ? carbohydratePerServingRef.current.value *= 1.0 : 1.0,
			protienPerServing: protienPerServingRef.current != null ? protienPerServingRef.current.value *= 1.0 : 1.0,
			fatPerServing: fatPerServingRef.current != null ? fatPerServingRef.current.value *= 1.0 : 1.0,
			source: sourceRef.current !== null ? sourceRef.current.value : "",
			carbohydratePerServing: carbohydratePerServingRef.current !== null ? carbohydratePerServingRef.current.value *= 1.0 : 1.0,
			proteinPerServing: proteinPerServingRef.current != null ? proteinPerServingRef.current.value *= 1.0 : 1.0,
			fatPerServing: fatPerServingRef.current != null ? fatPerServingRef.current.value *= 1.0 : 1.0,
		};

		// https://velog.io/@shin6403/React-Form-Data-%EC%A0%84%EC%86%A1
		const formData = new FormData();
		formData.append("image", imageFile);
		console.log(imageFile);
		appendFormData(formData, sup);

		const response = await supplementPostAPI.post("", formData);
		//정보 초기화
		initAllInputRefs();
		setImageFile();
		initAllInputRefs();
		setImageFile([]);
	}

	const handleSupplementDropdown = (event) => {
		setSubmitSupplementType(event.target.value);
	}

	/**
	 * Return HTML VALUES
	 */
	const showAdditionalSupplemnetInput = () => {
		return (
			<div>
				<div className={classes.control}>
					<label htmlFor="source">source</label>
					<input type="text" id="source" placeholder="source" ref={sourceRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="carbohydratePerServing">carbohydratePerServing</label>
					<input type="number" id="carbohydratePerServing" step="0.01" placeholder="0.01" ref={carbohydratePerServingRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="proteinPerServing">protienPerServing</label>
					<input type="number" id="proteinPerServing" step="0.01" placeholder="0.01" ref={proteinPerServingRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="fatPerServing">fatPerServing</label>
					<input type="number" id="fatPerServing" step="0.01" placeholder="fatPerServing" ref={fatPerServingRef}></input>
				</div>
			</div>
		);
	}


	//protien을 protein 으로 적었음..
	return (
		<div>
			<header>
				<label htmlFor="supplement-select">Select Supplement Type</label>
				<select id="supplement-select" onChange={handleSupplementDropdown}>
					<option value="Protein">Protein</option>
					<option value="Gainer">Gainer</option>
					<option value="BCAA">BCAA</option>
				</select>
				{/*supplementType 버튼 선택*/}
				<p></p>
			</header>
			<form className={classes.form} onSubmit={handleSupplementSubmit}>
				<div className={classes.control}>
					<label htmlFor="englishName">englishName</label>
					<input type="text" id="engishName" placeholder="englishName" ref={eNameRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="koreanName">koreanName</label>
					<input type="text" id="koreanName" placeholder="koreanName" ref={kNameRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="servings">servings</label>
					<input type="number" id="servings" step="0.01" placeholder="servings" ref={servingsRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="price">price</label>
					<input type="number" id="price" step="0.01" placeholder="price" ref={priceRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="marketURL">marketURL</label>
					<input type="url" id="marketURL" placeholder="https://123" ref={marketURLRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="description">description</label>
					<input type="text" id="description" placeholder="description" ref={descriptionRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="flavor">flavor</label>
					<input type="text" id="flavor" placeholder="flavor" ref={flavorRef}></input>
				</div>
				{submitSupplementType !== 'BCAA' && showAdditionalSupplemnetInput()}
				<div className={classes.control}>
					<label htmlFor="fileUpload">fileUpload</label>
					<input type="file" id="fileUpload" onChange={handleSupplementFile}></input>
				</div>
				<div>
					<button type="button" onClick={handleModalClose}>닫기</button>
					<button type="submit">추가</button>
				</div>
			</form>
		</div>
	);
};

export default SupplementAdd;
