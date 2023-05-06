import {
	createBrowserRouter,
	Route,
	Link,
	NavLink,
	createRoutesFromChildren,
	createRoutesFromElements,
	RouterProvider
} from "react-router-dom";

import Home from "./Pages/Home";
import RootLayout from "./Layout/RootLayout";
import NonMemberExerciseForm from "./Pages/NonMemberExerciseForm";
import NonMemberSupplementForm from "./Pages/NonMemberSupplementForm";
import MemberProfile from "./Pages/MemberProfile";
import SignIn, {signInAction} from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Manage_Main from "./Manage/Manage_Main";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="nonMemberEform" element={<NonMemberExerciseForm/>} />
			<Route path="nonMemberSform" element={<NonMemberSupplementForm />} />
			<Route path="profile" element={<MemberProfile />} />
			<Route path="admin" element={<Manage_Main />} />
			<Route path="signIn" element={<SignIn />} action={signInAction}/>
			<Route path="signUp" element={<SignUp />} />
		</Route>
	)
);

const Navigator = (props) => {
	return (
		<RouterProvider router={router} />
	);
};

export default Navigator;
