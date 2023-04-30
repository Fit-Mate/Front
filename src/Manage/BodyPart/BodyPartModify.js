import React from "react";

import { bodyPartPutAPI, bodyPartPostAPI } from "../../API/API";

import classes from "../css/FormInput.module.css";
import { bodyPart_data } from "../../DataTypes/data-types";


/**
 *
 * @param {*} props: props.bodyPart, props.onClose
 * @returns
 */
const BodyPartModify = (props) => {

	console.log(props);

	const eNameRef = React.useRef("");
	const kNameRef = React.useRef("");

	/**
	 * Non-state var
	 */

	/**
	 * State var
	 */

	/**
	 * Functions
	 */

	const initAllInputRefs = () => {
		eNameRef.current.value = "";
		kNameRef.current.value = "";
	}

	/**
	 * Handler
	*/
	const handleModalClose = (event) => {
		props.onClose();
	}

	const handleBodyPartSubmit = async (event) => {
		event.preventDefault();

		const bPart = {
			englishName: eNameRef.current.value,
			koreanName: kNameRef.current.value,
		};

		// https://velog.io/@shin6403/React-Form-Data-%EC%A0%84%EC%86%A1
		console.log(props.id);
		const response = await bodyPartPutAPI.put(`/${props.id}`, bPart);
		//정보 초기화
		initAllInputRefs();
	}

	/**
	 * useEffect
	 */
	React.useEffect(() => {
		eNameRef.current.value = props.bodyPart.englishName;
		kNameRef.current.value = props.bodyPart.koreanName;

	}, [eNameRef, kNameRef])

	/**
	 * Return HTML VALUES
	 */

	//protien을 protein 으로 적었음..
	return (
		<div>
			<form className={classes.form} onSubmit={handleBodyPartSubmit}>
				<div className={classes.control}>
					<label htmlFor="englishName">englishName</label>
					<input type="text" id="engishName" placeholder="englishName" ref={eNameRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="koreanName">koreanName</label>
					<input type="text" id="koreanName" placeholder="koreanName" ref={kNameRef}></input>
				</div>
				<div>
					<button type="button" onClick={handleModalClose}>닫기</button>
					<button type="submit">수정</button>
				</div>
			</form>
		</div>
	);
};

export default BodyPartModify;
