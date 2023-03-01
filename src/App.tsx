import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard/Index";
import { Login } from "./components/OnBoarding/Login";
import { SignUp } from "./components/OnBoarding/Signup";
import OrganizationList from "./components/ManageOrganization/OrganizationList";
import { GeneratorFormsContainer } from "./components/SchemaGenerator/GeneratorFormsContainer";
import { getFromSession } from "./Utils/Auth";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setUserId } from "./redux/reducers/AuthSlice";
import SideBarScreen from "./components/Sidebar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	const userIdFromSession = getFromSession("userId");
	const dispatch = useAppDispatch();

	if (userIdFromSession) {
		dispatch(setUserId(userIdFromSession));
	}

	const sideBarList = useAppSelector((state) => state.sidebar.sideBarData);
	return (
		<BrowserRouter>
			<ToastContainer />
			{sideBarList.length !== 0 && (
				<section className="fixed z-50">
					<SideBarScreen />
				</section>
			)}
			<Routes>
				<Route
					path=""
					element={
						userIdFromSession ? (
							<Navigate to="/organization-lists" />
						) : (
							<Navigate to="/signup" />
						)
					}
				/>
				<Route
					path="/signup"
					element={<SignUp />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/organization-lists"
					element={<OrganizationList />}
				/>
				<Route
					path="/create-organization"
					element={<GeneratorFormsContainer />}
				/>
				<Route
					path="/edit-organization-schema"
					element={<GeneratorFormsContainer />}
				/>
				<Route
					path="/organization/:id"
					element={<Dashboard />}
				/>
				<Route
					path="/organization"
					element={<Navigate to="/organization-lists" />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
