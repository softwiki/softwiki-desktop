import { isBrowser, isLinux, isWindows } from "./utils";

export async function readFile(path: string): Promise<string> {
	if (isBrowser()) {
		const content = localStorage.getItem(path);
		if (!content)
			throw "No item found in localStorage for path: " + path;
		return content;
	}
	const fs =  window.require("fs").promises;
	try {
		const data = await fs.readFile(path, "utf8");
		return data;
	}
	catch (e) {
		console.log("An error occured when trying to read file: " + path);
		console.log(e);
		throw e;
	}
}

export async function writeFile(path: string, content: string): Promise<void> {
	if (isBrowser()) {
		localStorage.setItem(path, content);
		return ;
	}

	const fs = window.require("fs").promises;
	try {
		await fs.writeFile(path, content);
	}
	catch (e) {
		console.log("An error occured when trying to write file: " + path);
		console.log(e);
		throw e;
	}
}

export function getDefaultBasePath(): string {
	let defaultPath = "";

	if (isLinux()) {
		defaultPath = getApp().getPath("home") + "/.softwiki";
	}
	else if (isWindows()) {
		return getApp().getPath("userData");
	}
	return defaultPath;
}

function getApp(): any {
	const { app } = window.require("@electron/remote");
	return app;
}