import React from "react";
import store from "./reducers/store";
import App from "./App";
import {Provider} from "react-redux";

const AppContainer = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}

export default AppContainer;