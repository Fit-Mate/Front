import React from "react";

import classes from "../css/FormInput.module.css";
import { workout_data } from "../../DataTypes/data-types";
import { workoutAPI, workoutPostAPI, bodyPartAPI } from "../../API/API";

/**css */
import Button from "../../UI/Button";

/**
 * @param {*} props : onClose
 *
 *
 */

const BodyPartCheckBoxList = (props) => {
	const bodyPartKoreanName = [...props.bodyPartKoreanName];

	return (
		bodyPartKoreanName.map((bodyPart, index) => {
			return (
				<li key={index}>
					<input
						type="checkbox"
						id={bodyPart}
						name={bodyPart}
						value={bodyPart}
						onChange={() => { props.handleBodyPartCheckBox(index) }}
					/>
					<label htmlFor={bodyPart}>{bodyPart}</label>
				</li>
			)
		}));
}

const BodyPartForm = (props) => {
	return (
		<fieldset>
			<legend>Select one or more BodyParts corresponding to the Workout</legend>
			<ul>
				<BodyPartCheckBoxList bodyPartKoreanName={props.bodyPartKoreanName} handleBodyPartCheckBox={props.handleBodyPartCheckBox} />
			</ul>
		</fieldset>
	);
}

const WorkoutAdd = (props) => {

	/**Refs */
	const eNameRef = React.useRef("");
	const kNameRef = React.useRef("");
	const descriptionRef = React.useRef("");
	const videoLinkRef = React.useRef("");

	/**
	 * Non-state var
	 */

	/**
	 * State Variables
	 */
	const [imageFile, setImageFile] = React.useState(new File([""], ""));

	const [bodyPartKoreanName, setBodyPartKoreanName] = React.useState([]);
	const [checkedBodyPart, setCheckedBodyPart] = React.useState([]);

	/**
	 * Functions
	 */
	const initAllInput = () => {
		eNameRef.current.value = "";
		kNameRef.current.value = "";
		descriptionRef.current.value = "";
		videoLinkRef.current.value = "";
		setCheckedBodyPart([]);
		setImageFile(new File[""], "");
	}


	const appendFormData = (formData, workoutObj) => {
		Object.entries(workoutObj).map(([key, value]) => {
			formData.append(key, value);
		});
	}

	// load bodyPartKoreanName from DB
		const loadBodyPartKoreanName = async () => {
		const response = await bodyPartAPI.get("/list");
		const bodyPartList = response.data;
		setBodyPartKoreanName(bodyPartList.bodyPartKoreanName);
		setCheckedBodyPart(new Array(bodyPartList.bodyPartKoreanName.length).fill(false));
	}

	//checkbox 선택된 bodyPart들을 String으로 반환하기.
	const getBodyPartKoreanNameList = () => {
		const checkedBodyPartKoreanNameList = bodyPartKoreanName.filter((bodyPart, index) => {
			return checkedBodyPart[index] === true
		});
		return checkedBodyPartKoreanNameList;
	}

	/**
	 * useEffect
	 */

	//first render: bodyPartKoreanName 가져오기
		React.useEffect(() => {
		loadBodyPartKoreanName();
	}, []);

	/**
	 * Handler
	*/
	const handleModalClose = (event) => {
		props.onClose();
	}

	const handleWorkoutFile = (event) => {
		setImageFile(event.target.files[0]);
	}

	const handleBodyPartCheckBox = (position) => {
		const updatedCheckedBodyPart = checkedBodyPart.map((item, index) => {
			return index === position ? !item : item
		});
		setCheckedBodyPart(updatedCheckedBodyPart);
	}

	const handleWorkoutSubmit = async (event) => {
		event.preventDefault();

		const checkedBodyPartKoreanNameList = getBodyPartKoreanNameList();

		const workoutData = {
			englishName: eNameRef.current.value,
			koreanName: kNameRef.current.value,
			description: descriptionRef.current.value,
			videoLink: videoLinkRef.current.value,
			bodyPartKoreanName: checkedBodyPartKoreanNameList,
		};

		// https://velog.io/@shin6403/React-Form-Data-%EC%A0%84%EC%86%A1
		const formData = new FormData();
		formData.append("image", imageFile);

		console.log(imageFile);

		appendFormData(formData, workoutData);

		for (let [key, val] of formData) {
			console.log(`key: ${key} + val ${val}`);
		}

		const response = await workoutPostAPI.post("", formData);
		//정보 초기화
		initAllInput();
		setImageFile(new File([""], ""));
		props.onClose();
	}

	/**
	 * Return HTML VALUES
	 */


	//protien을 protein 으로 적었음..
	return (
		<div>
			<header>
				<h2>운동 추가 폼</h2>
			</header>
			<form className={classes.form} onSubmit={handleWorkoutSubmit}>
				<div className={classes.control}>
					<label htmlFor="englishName">englishName</label>
					<input type="text" id="englishName" placeholder="englishName" ref={eNameRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="koreanName">koreanName</label>
					<input type="text" id="koreanName" placeholder="koreanName" ref={kNameRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="videoLink">videoLink</label>
					<input type="url" id="videoLink" placeholder="https://" ref={videoLinkRef}></input>
				</div>
				<div className={classes.control}>
					<label htmlFor="description">description</label>
					<input type="text" id="description" placeholder="description" ref={descriptionRef}></input>
				</div>
				<BodyPartForm bodyPartKoreanName={bodyPartKoreanName} handleBodyPartCheckBox={handleBodyPartCheckBox} />
				<div className={classes.control}>
					<label htmlFor="fileUpload">fileUpload</label>
					<input type="file" id="fileUpload" onChange={handleWorkoutFile}></input>
				</div>
				<div>
					<Button type="button" onClick={handleModalClose}>닫기</Button>
					<Button type="submit">추가</Button>
				</div>
			</form>
		</div>
	);
};

export default WorkoutAdd;

