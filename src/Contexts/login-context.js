import { createContext, useState } from "react";

const LoginContext = createContext({
	isLoggedIn: false,
	setIsLoggedIn: () => { }
})

export const LoginContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const loginValue = { isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn };

	return (
		<LoginContext.Provider value={loginValue}>
			{props.children}
		</LoginContext.Provider>
	);
}


export default LoginContext;
