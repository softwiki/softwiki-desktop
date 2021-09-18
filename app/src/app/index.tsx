import { ConfigService } from "app/services/config";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<ConfigService>
			<App/>
		</ConfigService>
	</React.StrictMode>,
	document.getElementById("root")
);
