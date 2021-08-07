import { SoftWikiApi, JsonProvider, DataEvent } from "softwiki-core";
import { Note, Tag } from "softwiki-core/models";
import { Project } from "softwiki-core/models";
import React, { useContext, useEffect, useState } from "react";
import { getDefaultBasePath, readFile, writeFile } from "files";

const api = new SoftWikiApi({
	provider: new JsonProvider(
		async (content: string) =>
		{
			await writeFile(getDefaultBasePath() + "/db.json", content);
		},
		async () =>
		{
			return await readFile(getDefaultBasePath() + "/db.json");
		}
	)
}); 

interface DataContextProps
{
	available: boolean
	notes: Note[]
	tags: Tag[]
	projects: Project[]
	api: SoftWikiApi
}

export const DataContext = React.createContext<DataContextProps>({
	available: false,
	notes: [],
	tags: [],
	projects: [],
	api: {} as SoftWikiApi // Is it dirty ?
});

interface FetchDataResult
{
	notes: Note[]
	tags: Tag[]
	projects: Project[]
}

async function fetchData(): Promise<FetchDataResult>
{
	const notes = api.getNotes();
	const tags = api.getTags();
	const projects = api.getProjects();
	return {notes, tags, projects};
}

interface DataProps
{
	children: JSX.Element | JSX.Element[]
}

export function Data({children}: DataProps)
{
	const [dataAvailable, setDataAvailable] = useState<boolean>(false);
	const [data, setData] = useState<FetchDataResult>({notes: [], tags: [], projects: []});

	useEffect(() => 
	{
		api.setup().then(() => 
		{
			fetchData().then((data: FetchDataResult) => 
			{				
				setData(data);
				setDataAvailable(true);
			});
		});
	}, []);

	api.subscribe(DataEvent.NotesUpdated, "Data.NotesUpdated", () => 
	{
		fetchData().then((data: FetchDataResult) => 
		{				
			setData(data);
		});
	});

	api.subscribe(DataEvent.TagsUpdated, "Data.TagsUpdated", () => 
	{
		fetchData().then((data: FetchDataResult) => 
		{				
			setData(data);
		});
	});

	api.subscribe(DataEvent.ProjectsUpdated, "Data.ProjectsUpdated", () => 
	{
		fetchData().then((data: FetchDataResult) => 
		{				
			setData(data);
		});
	});

	return (
		<DataContext.Provider value={{...data, available: dataAvailable, api}}>
			{children}
		</DataContext.Provider>
	);
}

export function useData()
{
	return useContext(DataContext);
} 