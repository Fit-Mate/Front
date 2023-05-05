import { createContext, useState, useEffect } from "react";

const LoginContext = createContext({
	isLoggedIn: false,
	isAdmin: false,
	setIsLoggedIn: () => { },
	setIsAdmin: () => { }
})

export const LoginContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(true);
	const loginValue = { isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn, isAdmin: isAdmin, setIsAdmin: setIsAdmin };

	//root
	useEffect(()=>{console.log(isLoggedIn, isAdmin)}, [isLoggedIn, isAdmin]);

	return (
		<LoginContext.Provider value={loginValue}>
			{props.children}
		</LoginContext.Provider>
	);
}


export default LoginContext;
