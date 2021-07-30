import { Note, Tag } from "SoftWiki-Core/Models";
import { createContext, useContext, useState } from "react";
import Event from "SoftWiki-Core/Services/EventService"
import { DataEvent } from "SoftWiki-Core/Data/DataApi";

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

	var Save = () => {
		if (!note)
			return

		if (unsavedChanges.title)
			note.SetTitle(unsavedChanges.title)
		if (unsavedChanges.content)
			note.SetContent(unsavedChanges.content)
	}

	var Delete = () => {
		SetNote(null)

		if (!note)
			return

		note.Delete()
	}

	var AddTag = (tag: Tag) => {
		if (!note)
			return
		note.AddTag(tag)
	}

	var RemoveTag = (tag: Tag) => {
		if (!note)
			return
		note.RemoveTag(tag)
	}

	var SelectNote = (noteToSelect: Note) =>
	{
		Save()

		SetNote(noteToSelect)
		SetUnsavedChanges({title: noteToSelect.GetTitle(), content: noteToSelect.GetContent()})
	}

	Event.Subscribe(DataEvent.NoteCreated, "NotesPage.NoteCreated", ({note}: {note: Note}) => {
		SelectNote(note)
		SetEditModeEnabled(true)
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