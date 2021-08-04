import { Note, Tag } from "softwiki-core/models";
import { createContext, useContext, useState } from "react";
import Event from "softwiki-core/services/EventService"
import { DataEvent } from "softwiki-core/data/DataApi";
import { useData } from "Data";

interface SelectedNoteContextProps
{
	note: Note | null
	selectNote: (note: Note) => void
	save: () => void
	delete: () => void
	addTag: (tag: Tag) => void
	removeTag: (tag: Tag) => void
	setUnsavedChanges: ({title, content}: {title: string, content: string}) => void
	unsavedChanges: {title: string, content: string}
	editModeEnabled: boolean
	setEditModeEnabled: (value: boolean) => void
}

const defaultValue: SelectedNoteContextProps = {
	note: null,
	selectNote: () => {},
	save: () => {},
	delete: () => {},
	addTag: (tag: Tag) => {},
	removeTag: (tag: Tag) => {},
	setUnsavedChanges: ({title, content}: {title: string, content: string}) => {},
	unsavedChanges: {title: "", content: ""},
	editModeEnabled: false,
	setEditModeEnabled: (value: boolean) => {}
}

export const SelectedNoteContext = createContext<SelectedNoteContextProps>(defaultValue)

export function SelectedNote({children}: {children: JSX.Element | JSX.Element[]})
{
	const [note, setNote] = useState<Note | null>(null)
	const [unsavedChanges, setUnsavedChanges] = useState<{title: string, content: string}>({title: "", content: ""})
	const [editModeEnabled, setEditModeEnabled] = useState<boolean>(false)

	const { api } = useData()

	const save = () => 
	{
		if (!note)
			return

		if (unsavedChanges.title)
			note.setTitle(unsavedChanges.title)
		if (unsavedChanges.content)
			note.setContent(unsavedChanges.content)
	}

	const deleteNote = () => 
	{
		setNote(null)

		if (!note)
			return

		note.delete()
	}

	const addTag = (tag: Tag) => 
	{
		if (!note)
			return
		note.addTag(tag)
	}

	const removeTag = (tag: Tag) => 
	{
		if (!note)
			return
		note.removeTag(tag)
	}

	const selectNote = (noteToSelect: Note) =>
	{
		save()

		setNote(noteToSelect)
		setUnsavedChanges({title: noteToSelect.getTitle(), content: noteToSelect.getContent()})
	}

	Event.subscribe(DataEvent.NoteCreated, "NotesPage.NoteCreated", (args: unknown) => 
	{
		const {note} = args as {note: Note}
		selectNote(note)
		setEditModeEnabled(true)
	})

	Event.subscribe(DataEvent.NotesUpdated, "NotesPage.NotesUpdated", () => 
	{
		const noteWithUpdate = api.getNotes().find((noteToCheck: Note) => note?.getId() === noteToCheck.getId())
		if (noteWithUpdate)
		{
			setNote(noteWithUpdate);
		}
	})

	return (
		<SelectedNoteContext.Provider
			value={{
				note,
				selectNote: selectNote,
				save: save,
				delete: deleteNote,
				addTag: addTag,
				removeTag: removeTag,
				setUnsavedChanges: setUnsavedChanges,
				unsavedChanges,
				editModeEnabled,
				setEditModeEnabled: setEditModeEnabled
			}}
		>
			{children}
		</SelectedNoteContext.Provider>
	)
}

export const useSelectedNote = () => { return useContext(SelectedNoteContext) }