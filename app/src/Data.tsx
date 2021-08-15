import { SoftWikiClient, DataEvent, FileSystemApiProvider, JsonApiProvider, Api } from "softwiki-core";
import { Note, Tag } from "softwiki-core/models";
import { Project } from "softwiki-core/models";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getDefaultBasePath } from "files";
import { ConfigContext, ConfigFields } from "Config";

const fs = window.require("fs").promises
fs.mkdir(getDefaultBasePath() + "/notes");
fs.mkdir(getDefaultBasePath() + "/config");

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

function getProviderFromConfig(provider: ConfigFields): Api
{
	return new FileSystemApiProvider(getDefaultBasePath(), fs);
}

interface DataContextProps
{
	notes: Note[]
	tags: Tag[]
	projects: Project[]
	api: SoftWikiClient
}

export const DataContext = React.createContext<DataContextProps>({
	notes: [],
	tags: [],
	projects: [],
	api: {} as SoftWikiClient // Is it dirty ?
});

interface FetchDataResult
{
	notes: Note[]
	tags: Tag[]
	projects: Project[]
}

interface DataProps
{
	children: JSX.Element | JSX.Element[]
}

export function Data({children}: DataProps)
{
	const config = useContext(ConfigContext);

	const [data, setData] = useState<FetchDataResult>({notes: [], tags: [], projects: []});

	const softWikiClient = useRef(
		new SoftWikiClient({
			provider: getProviderFromConfig(config)
		})
	).current

	useEffect(() => 
	{
		softWikiClient.init().then(() => 
		{
			setData({notes: softWikiClient.notes, tags: softWikiClient.tags, projects: softWikiClient.projects});
		});
	}, []);

	softWikiClient.subscribe(DataEvent.NotesUpdated, "Data.NotesUpdated", ({note}: any) => 
	{
		setData({notes: softWikiClient.notes, tags: softWikiClient.tags, projects: softWikiClient.projects});
	});

	softWikiClient.subscribe(DataEvent.TagsUpdated, "Data.TagsUpdated", () => 
	{
		setData({notes: softWikiClient.notes, tags: softWikiClient.tags, projects: softWikiClient.projects});
	});

	softWikiClient.subscribe(DataEvent.ProjectsUpdated, "Data.ProjectsUpdated", () => 
	{
		setData({notes: softWikiClient.notes, tags: softWikiClient.tags, projects: softWikiClient.projects});
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