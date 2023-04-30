import React from "react";

const BodyPartAdd= (props) => {

	const englishNameRef = React.useRef();
	const koreanNameRef = React.useRef();

	return (
		<div>
			<form >
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

export default BodyPartAdd;
