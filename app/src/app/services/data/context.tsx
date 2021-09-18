import { SoftWikiClient } from "libs/softwiki-core/src";
import { Note, Tag, Category } from "libs/softwiki-core/src/structures";
import React from "react";

export interface DataContextProps {
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