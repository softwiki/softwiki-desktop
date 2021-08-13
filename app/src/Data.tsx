import { SoftWikiClient, DataEvent, FileSystemApiProvider } from "softwiki-core";
import { Note, Tag } from "softwiki-core/models";
import { Project } from "softwiki-core/models";
import React, { useContext, useEffect, useState } from "react";
import { getDefaultBasePath } from "files";

const fs = window.require("fs").promises
fs.mkdir(getDefaultBasePath() + "/notes");
fs.mkdir(getDefaultBasePath() + "/config");

const api = new SoftWikiClient({
	provider: new FileSystemApiProvider(getDefaultBasePath(), fs)
});

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
	const [data, setData] = useState<FetchDataResult>({notes: [], tags: [], projects: []});

	useEffect(() => 
	{
		api.init().then(() => 
		{
			setData({notes: api.notes, tags: api.tags, projects: api.projects});
		});
	}, []);

	api.subscribe(DataEvent.NotesUpdated, "Data.NotesUpdated", ({note}: any) => 
	{
		console.log("A")
		console.log(note)
		setData({notes: api.notes, tags: api.tags, projects: api.projects});
	});

	api.subscribe(DataEvent.TagsUpdated, "Data.TagsUpdated", () => 
	{
		setData({notes: api.notes, tags: api.tags, projects: api.projects});
	});

	api.subscribe(DataEvent.ProjectsUpdated, "Data.ProjectsUpdated", () => 
	{
		setData({notes: api.notes, tags: api.tags, projects: api.projects});
	});

	return (
		<DataContext.Provider value={{...data, api}}>
			{children}
		</DataContext.Provider>
	);
}

export function useData()
{
	return useContext(DataContext);
} 