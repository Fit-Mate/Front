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
import RecommendForm from "./Pages/Recommend/RecommendForm";
import ShowHistory from "./Pages/Recommend/History/ShowHistory";
import MemberBodyDataSummary from "./Pages/MemberProfile/MemberBodyDataSummary";
import Inquiry from "./Pages/ServiceInquiry/Inquiry";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="nonMemberform" element={<NonMemberForm/>} action={nonMemberFormAction} />
			<Route path="admin" element={<Manage_Main />} />
			<Route path="profile" element={<MemberProfile />} />
			<Route path="signIn" element={<SignIn />} action={signInAction}/>
			<Route path="signUp" element={<SignUp />} action={signUpAction}/>
			<Route path="Recommend" element={<RecommendForm/>} />
			<Route path="bodyData" element={<MemberBodyDataSummary/>} />
			<Route path="recommendationHistory" element={<ShowHistory/>} />
			<Route path="inquiry" element={<Inquiry/>} />
		</Route>
	)
);

const Navigator = (props) => {
	return (
		<RouterProvider router={router} />
	);
};

export default Navigator;
