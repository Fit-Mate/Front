import React from "react";

/** API */
import { bodyDataPostAPI } from "../../../API/API";

/** CSS */
import classes from "../../../Manage/css/Manage_Supplement.module.css"

/** UI */
import Button from "../../../UI/Button";

/** datatype */
import { bodyData_data } from "../../../DataTypes/data-types";


/**
 *
 * @param {*} props: props.bodyData, props.onClose
 * @returns
 */
const BodyDataModify = (props) => {

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

	const handleBodyDataSubmit = async (event) => {
		event.preventDefault();

		const bPart = {
			englishName: eNameRef.current.value,
			koreanName: kNameRef.current.value,
		};

		// https://velog.io/@shin6403/React-Form-Data-%EC%A0%84%EC%86%A1
		console.log(props.id);
		const response = await bodyDataPostAPI.put(`/${props.id}`, bPart);
		//정보 초기화
		initAllInputRefs();
	}

	/**
	 * useEffect
	 */
	React.useEffect(() => {
		eNameRef.current.value = props.bodyData.englishName;
		kNameRef.current.value = props.bodyData.koreanName;

	}, [eNameRef, kNameRef])

	/**
	 * Return HTML VALUES
	 */

	//protien을 protein 으로 적었음..
	return (
		<div>
			<form className={classes.form} onSubmit={handleBodyDataSubmit}>
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
					<Button type="submit" onClick={handleModalClose}>수정</Button>
				</div>
			</form>
		</div>
	);
};

export default BodyDataModify;
