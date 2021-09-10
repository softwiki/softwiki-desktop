import { Config } from "app/Config";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./others/reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<Config>
			<App />
		</Config>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
