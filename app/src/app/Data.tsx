import { SoftWikiClient, DataEvent, FileSystemApiProvider, JsonApiProvider, Api } from "libs/softwiki-core/src";
import { Note, Tag } from "libs/softwiki-core/src/objects";
import { Category } from "libs/softwiki-core/src/objects";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getDefaultBasePath, readFile, writeFile } from "app/files";
import { ConfigContext, ConfigFields } from "app/Config";
import { isBrowser, isLinux, isWindows } from "app/utils";

if (isLinux() || isWindows())
{
	const fs = window.require("fs").promises
	fs.mkdir(getDefaultBasePath() + "/notes");
	fs.mkdir(getDefaultBasePath() + "/config");
}

/*const softWikiClient = new SoftWikiClient({
	provider: new FileSystemApiProvider(getDefaultBasePath(), fs)
});*/

/*const softWikiClient = new SoftWikiClient({
	provider: new JsonApiProvider(async (content: string) =>
	{
		await fs.writeFile(getDefaultBasePath() + "/notes/db.json", content);
	}, async () =>
	{
		return await fs.readFile(getDefaultBasePath() + "/notes/db.json", "utf8");
	})
});*/

function getProviderFromConfig(config: ConfigFields): Api
{
	if (isBrowser())
	{
		return new JsonApiProvider(async (content: string) =>
		{
			await writeFile(getDefaultBasePath() + "/notes/db.json", content);
		}, async () =>
		{
			return await readFile(getDefaultBasePath() + "/notes/db.json");
		})
	}

	if (config.provider.type === "fs")
	{
		const fs = window.require("fs").promises
		return new FileSystemApiProvider(getDefaultBasePath(), fs);
	}
	throw new Error(`No provider found for configuation type "${config.provider.type}"`)
	/*return new JsonApiProvider(async (content: string) =>
	{
		await writeFile(getDefaultBasePath() + "/notes/db.json", content);
	}, async () =>
	{
		return await readFile(getDefaultBasePath() + "/notes/db.json");
	})*/
}

interface DataContextProps
{
	notes: Note[]
	tags: Tag[]
	categories: Category[]
	api: SoftWikiClient
}

export const DataContext = React.createContext<DataContextProps>({
	notes: [],
	tags: [],
	categories: [],
	api: {} as SoftWikiClient // Is it dirty ?
});

interface FetchDataResult
{
	notes: Note[]
	tags: Tag[]
	categories: Category[]
}

interface DataProps
{
	children: JSX.Element | JSX.Element[]
}

export function Data({children}: DataProps)
{
	const config = useContext(ConfigContext);

	const [data, setData] = useState<FetchDataResult>({notes: [], tags: [], categories: []});

	const softWikiClient = useRef(
		new SoftWikiClient({
			provider: getProviderFromConfig(config)
		})
	).current

	useEffect(() => 
	{
		softWikiClient.init().then(() => 
		{
			setData({notes: softWikiClient.notes, tags: softWikiClient.tags, categories: softWikiClient.categories});
		});
	}, []);

	softWikiClient.subscribe(DataEvent.NotesUpdated, "Data.NotesUpdated", () => 
	{
		setData({notes: softWikiClient.notes, tags: softWikiClient.tags, categories: softWikiClient.categories});
	});

	softWikiClient.subscribe(DataEvent.TagsUpdated, "Data.TagsUpdated", () => 
	{
		setData({notes: softWikiClient.notes, tags: softWikiClient.tags, categories: softWikiClient.categories});
	});

	softWikiClient.subscribe(DataEvent.CategoriesUpdated, "Data.CategoriesUpdated", () => 
	{
		setData({notes: softWikiClient.notes, tags: softWikiClient.tags, categories: softWikiClient.categories});
	});

	return (
		<DataContext.Provider value={{...data, api: softWikiClient}}>
			{children}
		</DataContext.Provider>
	);
}

export function useData()
{
	return useContext(DataContext);
} 