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

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="nonMemberEform" element={<NonMemberExerciseForm/>} />
			<Route path="nonMemberSform" element={<NonMemberSupplementForm />} />
			<Route path="profile" element={<MemberProfile />} />
		</Route>
	)
);

const Navigator = (props) => {
	return (
		<RouterProvider router={router} />
	);
};

export default Navigator;
