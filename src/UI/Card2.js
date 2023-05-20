import React from "react";
import classes from './Card2.module.css';

const Card2 = (props) => {
	return (
		<div className={classes.card2}>
			{props.children}
		</div>
	);
};

export const HeaderCard = (props) => {
	return (
		<header>
			<Card2>
				<h2>{props.title}</h2>
			</Card2>
		</header>
	);
};

export default Card2;
