import React from "react";

/** API */
import { bodyPartPostAPI } from "../../API/API";

/** CSS */
import classes from "../css/FormInput.module.css";
import Button from "../../UI/Button";

/** */
import { bodyPart_data } from "../../DataTypes/data-types";

/** UI */


/**
 * Basic elements : englishName, koreanName, description, marketURL, price, servings, id, flavor
 * Machine Type [Protien] : carbohydratePerServing, source, protienPerServing, fatPerServing
 * Machine Type [Gainer] : carbohydratePerServing, source, protienPerServing, fatPerServing
 * Machine Type [BCAA] : flavor
 */


/**
 * @param {*} props : onClose
 */
const MachineAdd = (props) => {

	const eNameRef = React.useRef("");
	const kNameRef = React.useRef("");

	/**
	 * Non-state var
	 */

	//handleMachineAdd

	/**
	 * Functions
	 */
	const initAllInputRefs = () => {
		eNameRef.current.value = "";
		kNameRef.current.value = "";
	}

	const appendFormData = (formData, bodyPartObj) => {
		Object.entries(bodyPartObj).map(([key, value]) => {
			formData.append(key, value);
		});
		return formData;
	}

	/**
	 * Handler
	*/
	const handleModalClose = (event) => {
		props.onClose();
	}

	const handleMachineSubmit = async (event) => {
		event.preventDefault();

		const machine= {
			englishName: eNameRef.current.value,
			koreanName: kNameRef.current.value,
		};

		// https://velog.io/@shin6403/React-Form-Data-%EC%A0%84%EC%86%A1

		const response = await bodyPartPostAPI.post("", machine);
		//정보 초기화
		initAllInputRefs();
	}

	/**
	 * useEffect
	 */

	/**
	 * Render
	 */

	//protien을 protein 으로 적었음..
	return (
		<div>
			<form className={classes.form} onSubmit={handleMachineSubmit}>
				<div className={classes.control}>
					<label htmlFor="englishName">englishName</label>
					<input type="text" id="engishName" placeholder="englishName" ref={eNameRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="koreanName">koreanName</label>
					<input type="text" id="koreanName" placeholder="koreanName" ref={kNameRef}></input>
				</div>
				<div>
					<Button type="button" onClick={handleModalClose}>닫기</Button>
					<Button type="submit">추가</Button>
				</div>
			</form>
		</div>
	);
};

export default MachineAdd;

