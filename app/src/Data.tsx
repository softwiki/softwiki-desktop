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

async function FetchData(): Promise<FetchDataResult>
{
	const notes = DataApi.GetNotes();
	const tags = DataApi.GetTags();
	const projects = DataApi.GetProjects();
	return {notes, tags, projects};
}

interface DataProps
{
	children: JSX.Element | JSX.Element[]
}

export function Data({children}: DataProps)
{
	const [dataAvailable, SetDataAvailable] = useState<boolean>(false);
	const [data, SetData] = useState<FetchDataResult>({notes: [], tags: [], projects: []});

	useEffect(() => {
		DataApi.Setup().then(() => {
			FetchData().then((data: FetchDataResult) => {				
				SetData(data);
				SetDataAvailable(true);
			});
		});
	}, []);

	Event.Subscribe(DataEvent.NotesUpdated, "Data.NotesUpdated", () => {
		FetchData().then((data: FetchDataResult) => {				
			SetData(data);
		});
	});

	Event.Subscribe(DataEvent.TagsUpdated, "Data.TagsUpdated", () => {
		FetchData().then((data: FetchDataResult) => {				
			SetData(data);
		});
	});

	Event.Subscribe(DataEvent.ProjectsUpdated, "Data.ProjectsUpdated", () => {
		FetchData().then((data: FetchDataResult) => {				
			SetData(data);
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