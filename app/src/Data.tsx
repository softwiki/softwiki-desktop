import DataApi, { DataApiClass, DataEvent } from "softwiki-core/data/DataApi";
import { Note, Tag } from "softwiki-core/models";
import { Project } from "softwiki-core/models/Project";
import React, { useContext, useEffect, useState } from "react";
import Event from "softwiki-core/services/EventService";

interface DataContextProps
{
	available: boolean
	notes: Note[]
	tags: Tag[]
	projects: Project[]
	api: DataApiClass
}

export const DataContext = React.createContext<DataContextProps>({
	available: false,
	notes: [],
	tags: [],
	projects: [],
	api: DataApi
});

interface FetchDataResult
{
	notes: Note[]
	tags: Tag[]
	projects: Project[]
}

async function fetchData(): Promise<FetchDataResult>
{
	const notes = DataApi.getNotes();
	const tags = DataApi.getTags();
	const projects = DataApi.getProjects();
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
		DataApi.setup().then(() => 
		{
			fetchData().then((data: FetchDataResult) => 
			{				
				setData(data);
				setDataAvailable(true);
			});
		});
	}, []);

	Event.subscribe(DataEvent.NotesUpdated, "Data.NotesUpdated", () => 
	{
		fetchData().then((data: FetchDataResult) => 
		{				
			setData(data);
		});
	});

	Event.subscribe(DataEvent.TagsUpdated, "Data.TagsUpdated", () => 
	{
		fetchData().then((data: FetchDataResult) => 
		{				
			setData(data);
		});
	});

	Event.subscribe(DataEvent.ProjectsUpdated, "Data.ProjectsUpdated", () => 
	{
		fetchData().then((data: FetchDataResult) => 
		{				
			setData(data);
		});
	});

	return (
		<DataContext.Provider value={{...data, available: dataAvailable, api: DataApi}}>
			{children}
		</DataContext.Provider>
	);
}

export function useData()
{
	return useContext(DataContext);
} 