import React from "react";
import { Provider, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import store from "./redux/store";
import AuthForm from "./components/AuthForm";
import Dashboard from "./pages/Dashboard";
import theme from "./theme/theme";

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Router>
					<Routes>
						<Route path="/" element={<AuthForm />} />
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</Router>
			</ThemeProvider>
		</Provider>
	);
};

const ProtectedRoute = ({ children }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	return isAuthenticated ? children : <Navigate to="/" />;
};

export default App;
