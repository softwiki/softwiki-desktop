import { SoftWikiClient, DataEvent, FileSystemApiProvider, JsonApiProvider, Api } from "libs/softwiki-core/src";
import { Note, Tag } from "libs/softwiki-core/src/structures";
import { Category } from "libs/softwiki-core/src/structures";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getDefaultBasePath, readFile, writeFile } from "app/utils/files";
import { ConfigContext, ConfigFields } from "app/services/config";
import { isBrowser, isLinux, isWindows } from "app/utils";
import RemoteDataProvider from "libs/softwiki-core/src/data-providers/RemoteDataProvider";
import { useMessage } from "../../messages";
import { DataContext } from "./context";

if (isLinux() || isWindows()) {
	const fs = window.require("fs").promises
	fs.mkdir(getDefaultBasePath() + "/notes");
	fs.mkdir(getDefaultBasePath() + "/config");
}

function getProviderFromConfig(config: ConfigFields): Api {
	if (isBrowser()) {
		return new JsonApiProvider(async (content: string) => {
			await writeFile(getDefaultBasePath() + "/notes/db.json", content);
		}, async () => {
			return await readFile(getDefaultBasePath() + "/notes/db.json");
		})
	}
	
	if (config.provider.type === "remote") {
		return new RemoteDataProvider((config.provider.config as any).host);
	}
	else if (config.provider.type === "fs") {
		const fs = window.require("fs").promises
		return new FileSystemApiProvider(getDefaultBasePath(), fs);
	}

	throw new Error(`No provider found for configuation type "${config.provider.type}"`)
}

interface FetchDataResult {
	notes: Note[]
	tags: Tag[]
	categories: Category[]
}

interface DataProps {
	children: JSX.Element | JSX.Element[]
}

export function DataService({children}: DataProps) {
	const config = useContext(ConfigContext);

	const [data, setData] = useState<FetchDataResult>({notes: [], tags: [], categories: []});

	const {pushModal} = useMessage()

	const softWikiClient = useRef(
		new SoftWikiClient({
			provider: getProviderFromConfig(config)
		})
	).current

	useEffect(() => {
		softWikiClient.init().then(() =>  {
			setData({notes: softWikiClient.notes, tags: softWikiClient.tags, categories: softWikiClient.categories});
		}).catch((err) => {
			console.log(err)
			pushModal(`Unexpected error during data initialization, please restart the application (${err.message})`)
		});
	}, []);

	softWikiClient.subscribe(DataEvent.NotesUpdated, "Data.NotesUpdated", () => {
		setData({notes: softWikiClient.notes, tags: softWikiClient.tags, categories: softWikiClient.categories});
	});

	softWikiClient.subscribe(DataEvent.TagsUpdated, "Data.TagsUpdated", () => {
		setData({notes: softWikiClient.notes, tags: softWikiClient.tags, categories: softWikiClient.categories});
	});

	softWikiClient.subscribe(DataEvent.CategoriesUpdated, "Data.CategoriesUpdated", () => {
		setData({notes: softWikiClient.notes, tags: softWikiClient.tags, categories: softWikiClient.categories});
	});

	return (
		<DataContext.Provider value={{...data, api: softWikiClient}}>
			{children}
		</DataContext.Provider>
	);
}

export function useData() {
	return useContext(DataContext);
} 