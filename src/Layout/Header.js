import React from 'react';


/**
 * 화면의 header에 대한 항목.
 * @param {*} props.length
 * @props {string} props.headerText
 * @props {bool} props.renderButton
 * @props button.
 * @returns
 */

const Header = (props) => {
	return (
		<React.Fragment>
			<header className='header'>
				<h1>
					{props.headerTxt}
				</h1>
			</header>
		</React.Fragment>
	);
}

export default Header;
