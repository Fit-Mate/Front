import { createContext, useState, useEffect } from "react";

const LoginContext = createContext({
	isLoggedIn: false,
	isAdmin: false,
	loginId: "nonMember",
	setIsLoggedIn: () => { },
	setIsAdmin: () => { },
	setLoginId: () => { },
})

export const LoginContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	const [loginId, setLoginId] = useState("nonMember");
	const loginValue = {
		isLoggedIn: isLoggedIn,
		setIsLoggedIn: setIsLoggedIn,
		isAdmin: isAdmin,
		setIsAdmin: setIsAdmin,
		loginId: loginId,
		setLoginId: setLoginId,
	};

	//root
	useEffect(() => { console.log(isLoggedIn, isAdmin) }, [isLoggedIn, isAdmin]);

	return (
		<LoginContext.Provider value={loginValue}>
			{props.children}
		</LoginContext.Provider>
	);
}

export default LoginContext;
