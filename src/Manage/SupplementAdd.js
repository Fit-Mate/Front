import React from "react";

import { supplementAPI } from "../API/API";

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

	const eNameRef = React.useRef();
	const kNameRef = React.useRef();
	const descriptionRef = React.useRef();
	const marketURLRef = React.useRef();
	const priceRef = React.useRef();
	const servingsRef = React.useRef();
	const flavorRef = React.useRef();
	const carbohydratePerServingRef = React.useRef();
	const protienPerServingRef = React.useRef();
	const fatPerServingRef = React.useRef();
	const sourceRef = React.useRef();

	/**
	 * Non-state var
	 */

	//handleSupplementAdd
	const [submitSupplementType, setSubmitSupplementType] = React.useState("");


	/**
	 * Handler
	*/
	const handleModalClose = (event) => {
		props.onClose();
	}

	const handleSupplementSubmit = (event) => {
		const sup = {};
		event.preventDefault();
	}

	const handleSupplementDropdown = (event) => {
		console.log(submitSupplementType);
		setSubmitSupplementType(() => event.target.value);
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
					<input type="text" id="carbohydratePerServing" placeholder="carbohydratePerServing" ref={carbohydratePerServingRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="protienPerServing">protienPerServing</label>
					<input type="text" id="protienPerServing" placeholder="protienPerServing" ref={protienPerServingRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="fatPerServing">fatPerServing</label>
					<input type="text" id="fatPerServing" placeholder="fatPerServing" ref={fatPerServingRef}></input>
				</div>
			</div>
		);
	}



	return (
		<div>
			<header>
				<label htmlFor="supplement-select">Select Supplement Type</label>
				<select id="supplement-select" onChange={handleSupplementDropdown}>
					<option value="protien">Protien</option>
					<option value="gainer">Gainer</option>
					<option value="bcaa">BCAA</option>
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
					<input type="number" id="servings" placeholder="servings" ref={servingsRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="price">price</label>
					<input type="number" id="price" placeholder="price" ref={priceRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="marketURL">marketURL</label>
					<input type="url" id="marketURL" placeholder="marketURL" ref={marketURLRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="description">description</label>
					<input type="text" id="description" placeholder="description" ref={descriptionRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="flavor">flavor</label>
					<input type="text" id="flavor" placeholder="flavor" ref={flavorRef}></input>
				</div>
				{submitSupplementType !== 'bcaa' && showAdditionalSupplemnetInput()}

				<div>
					<button type="button" onClick={handleModalClose}>닫기</button>
					<button type="submit">추가</button>
				</div>
			</form>
		</div>
	);
};

export default SupplementAdd;
