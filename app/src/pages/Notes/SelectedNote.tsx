import { Note, Tag } from "softwiki-core/models";
import { createContext, useContext, useState } from "react";
import Event from "softwiki-core/services/EventService"
import { DataEvent } from "softwiki-core/data/DataApi";
import { useData } from "Data";

interface SelectedNoteContextProps
{
	note: Note | null
	SelectNote: (note: Note) => void
	Save: () => void
	Delete: () => void
	AddTag: (tag: Tag) => void
	RemoveTag: (tag: Tag) => void
	SetUnsavedChanges: ({title, content}: {title: string, content: string}) => void
	unsavedChanges: {title: string, content: string}
	editModeEnabled: boolean
	SetEditModeEnabled: (value: boolean) => void
}

const defaultValue: SelectedNoteContextProps = {
	note: null,
	SelectNote: () => {},
	Save: () => {},
	Delete: () => {},
	AddTag: (tag: Tag) => {},
	RemoveTag: (tag: Tag) => {},
	SetUnsavedChanges: ({title, content}: {title: string, content: string}) => {},
	unsavedChanges: {title: "", content: ""},
	editModeEnabled: false,
	SetEditModeEnabled: (value: boolean) => {}
}

export const SelectedNoteContext = createContext<SelectedNoteContextProps>(defaultValue)

export function SelectedNote({children}: {children: JSX.Element | JSX.Element[]})
{
	const [note, SetNote] = useState<Note | null>(null)
	const [unsavedChanges, SetUnsavedChanges] = useState<{title: string, content: string}>({title: "", content: ""})
	const [editModeEnabled, SetEditModeEnabled] = useState<boolean>(false)

	const { api } = useData()

	const Save = () => {
		if (!note)
			return

		if (unsavedChanges.title)
			note.SetTitle(unsavedChanges.title)
		if (unsavedChanges.content)
			note.SetContent(unsavedChanges.content)
	}

	const Delete = () => {
		SetNote(null)

		if (!note)
			return

		note.Delete()
	}

	const AddTag = (tag: Tag) => {
		if (!note)
			return
		note.AddTag(tag)
	}

	const RemoveTag = (tag: Tag) => {
		if (!note)
			return
		note.RemoveTag(tag)
	}

	const SelectNote = (noteToSelect: Note) =>
	{
		Save()

		SetNote(noteToSelect)
		SetUnsavedChanges({title: noteToSelect.GetTitle(), content: noteToSelect.GetContent()})
	}

	Event.Subscribe(DataEvent.NoteCreated, "NotesPage.NoteCreated", (args: unknown) => {
		const {note} = args as {note: Note}
		SelectNote(note)
		SetEditModeEnabled(true)
	})

	Event.Subscribe(DataEvent.NotesUpdated, "NotesPage.NotesUpdated", () => {
		const noteWithUpdate = api.GetNotes().find((note_: Note) => note?.Id() === note_.Id())
		if (noteWithUpdate)
		{
			SetNote(noteWithUpdate);
		}
	})

	return (
		<SelectedNoteContext.Provider
			value={{
				note,
				SelectNote,
				Save,
				Delete,
				AddTag,
				RemoveTag,
				SetUnsavedChanges,
				unsavedChanges,
				editModeEnabled,
				SetEditModeEnabled
			}}
		>
			{children}
		</SelectedNoteContext.Provider>
	)
}

export const useSelectedNote = () => { return useContext(SelectedNoteContext) }