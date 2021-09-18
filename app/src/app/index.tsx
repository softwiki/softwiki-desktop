import { Config } from "app/Config";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<Config>
			<App/>
		</Config>
	</React.StrictMode>,
	document.getElementById("root")
);
