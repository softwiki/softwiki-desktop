import { Note, Tag } from "libs/softwiki-core/src/objects";
import { createContext, useContext, useState } from "react";
import { DataEvent } from "libs/softwiki-core/src";
import { useData } from "app/Data";

interface SelectedNoteContextProps
{
	note: Note | null
	selectNote: (note: Note) => Promise<void>
	save: () => Promise<void>
	delete: () => Promise<void>
	addTag: (tag: Tag) => Promise<void>
	removeTag: (tag: Tag) => Promise<void>
	setUnsavedChanges: ({title, content}: {title: string, content: string}) => void
	unsavedChanges: {title: string, content: string}
	editModeEnabled: boolean
	setEditModeEnabled: (value: boolean) => void
}

const defaultValue: SelectedNoteContextProps = {
	note: null,
	selectNote: async () => {},
	save: async () => {},
	delete: async () => {},
	addTag: async () => {},
	removeTag: async () => {},
	setUnsavedChanges: () => {},
	unsavedChanges: {title: "", content: ""},
	editModeEnabled: false,
	setEditModeEnabled: () => {}
}

export const SelectedNoteContext = createContext<SelectedNoteContextProps>(defaultValue)

export function SelectedNote({children}: {children: JSX.Element | JSX.Element[]})
{
	const [note, setNote] = useState<Note | null>(null)
	const [unsavedChanges, setUnsavedChanges] = useState<{title: string, content: string}>({title: "", content: ""})
	const [editModeEnabled, setEditModeEnabled] = useState<boolean>(false)

	const { api } = useData()

	const save = async () => 
	{
		if (!note)
			return

		if (unsavedChanges.title !== note.getTitle())
			await note.setTitle(unsavedChanges.title)
		if (unsavedChanges.content !== note.getContent())
			await note.setContent(unsavedChanges.content)
	}

	const deleteNote = async () => 
	{
		setNote(null)

		if (!note)
			return

		await note.delete()
	}

	const addTag = async (tag: Tag) => 
	{
		if (!note)
			return
		await note.addTag(tag)
	}

	const removeTag = async (tag: Tag) => 
	{
		if (!note)
			return
		await note.removeTag(tag)
	}

	const selectNote = async (noteToSelect: Note) =>
	{
		await save()

		setNote(noteToSelect)
		setUnsavedChanges({title: noteToSelect.getTitle(), content: noteToSelect.getContent()})
	}

	api.subscribe(DataEvent.NoteCreated, "NotesPage.NoteCreated", (args: unknown) => 
	{
		const {note} = args as {note: Note}
		selectNote(note)
		setEditModeEnabled(true)
	})

	api.subscribe(DataEvent.NotesUpdated, "NotesPage.NotesUpdated", () => 
	{
		const noteWithUpdate = api.notes.find((noteToCheck: Note) => note?.getId() === noteToCheck.getId())
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