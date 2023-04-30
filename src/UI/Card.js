import React from "react";
import classes from './Card.module.css';

const Card = (props) => {
	return (
		<div className={classes.card}>
			{props.children}
		</div>
	);
};

export const HeaderCard = (props) => {
	return (
		<header>
			<Card>
				<p>{props.title}</p>
			</Card>
		</header>
	);
};

export default Card;
