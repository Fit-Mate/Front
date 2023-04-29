import React from "react";

const BodyPartInputForm = (props) => {

	const englishNameRef = React.useRef();
	const koreanNameRef = React.useRef();

	return (
		<div>
			<form onSubmit={props.handleBodyPartManageForm}>
				<div>
					<label htmlFor="englishName">englishName</label>
					<input type='text' id='englishName' ref={englishNameRef} />
				</div>
				<div>
					<label htmlFor="koreanName">englishName</label>
					<input type='text' id='koreanName' ref={koreanNameRef}/>
				</div>
			</form>
		</div>
	);

};

export default BodyPartInputForm;
