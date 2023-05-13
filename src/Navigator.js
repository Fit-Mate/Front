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
import NonMemberForm, { nonMemberFormAction } from "./Pages/NonMemberForm";
import MemberProfile from "./Pages/MemberProfile";
import SignIn, {signInAction} from "./Pages/SignIn";
import SignUp, {signUpAction} from "./Pages/SignUp";
import Manage_Main from "./Manage/Manage_Main";
import ExerciseRecommendForm from "./Pages/Recommend/ExerciseRecommendForm";
import SupplementRecommendForm from "./Pages/Recommend/SupplementRecommendForm";
import WorkoutLog from "./Pages/Recommend/History/WorkoutLog";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="nonMemberform" element={<NonMemberForm/>} action={nonMemberFormAction} />
			<Route path="profile" element={<MemberProfile />} />
			<Route path="admin" element={<Manage_Main />} />
			<Route path="signIn" element={<SignIn />} action={signInAction}/>
			<Route path="signUp" element={<SignUp />} action={signUpAction}/>
			<Route path="exerciseRecommend" element={<ExerciseRecommendForm />} />
			<Route path="supplementRecommend" element={<SupplementRecommendForm />} />
			<Route path="recommendationHistory" element={<WorkoutLog />} />
		</Route>
	)
);

const Navigator = (props) => {
	return (
		<RouterProvider router={router} />
	);
};

export default Navigator;
