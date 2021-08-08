import React, { useContext, useState } from "react";
import { Project, Tag } from "softwiki-core/models";

interface GlobalStateContextProps
{
	selectedProject: Project | null
	selectProject: (project: Project | null) => void
	tagFilters: Tag[]
	addTagToFilters: (tag: Tag) => void
	removeTagFromFilters: (tag: Tag) => void
	resetTagFilters: (tags?: Tag[] | undefined) => void
	isTagFiltered: (tag: Tag) => boolean
}

const GlobalStateContext = React.createContext<GlobalStateContextProps | null>(null);

export function useGlobalState(): GlobalStateContextProps
{
	const context = useContext(GlobalStateContext);
	if (context === null)
		throw Error("GlobalState is not initialized");
	return context;
}

export function GlobalState({children}: {children: JSX.Element | JSX.Element[]})
{
	const [selectedProject, selectProject] = useState<Project | null>(null);
	const [tagFilters, setTagFilters] = useState<Tag[]>([]);

	const addTagToFilters = (tag: Tag) =>
	{
		if (tagFilters.find((checkTag: Tag) => { return tag.getId() === checkTag.getId() }))
			return
		tagFilters.push(tag);
		setTagFilters([...tagFilters]);
	}

	const removeTagFromFilters = (tag: Tag) =>
	{
		const i = tagFilters.findIndex((checkTag: Tag) => { return tag.getId() === checkTag.getId() });
		if (i === -1)
			return
		tagFilters.splice(i, 1);
		setTagFilters([...tagFilters]);
	}

	const resetTagFilters = (tags?: Tag[] | undefined) =>
	{
		setTagFilters(tags ? tags : []);
	}

	const isTagFiltered = (tag: Tag) =>
	{
		return tagFilters.find((checkTag: Tag) => { return tag.getId() === checkTag.getId() }) !== undefined;
	}

	return (
		<GlobalStateContext.Provider value={{
			selectedProject,
			selectProject,
			tagFilters,
			addTagToFilters,
			removeTagFromFilters,
			resetTagFilters,
			isTagFiltered
		}}>
			{children}
		</GlobalStateContext.Provider>
	)
}