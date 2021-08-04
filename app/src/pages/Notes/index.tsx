import styled from "styled-components"
import {useState} from "react"

import NoteList from "./NoteList"
import NoteViewer from "./NoteViewer"
import DataApi from "softwiki-core/data/DataApi"
import Projects from "./ProjectList"
import { Project } from "softwiki-core/models/Project"
import { SelectedNote, useSelectedNote } from "./SelectedNote"

const NotesLayout = styled.div`
	display: flex;
	flex-direction: row;

	flex: 1;
`

export default function NotesPage()
{
	/*useEffect(() => {
		let beforeunloadEvent = HandleWindowEvent("beforeunload", (ev: any) => // temporary workaround
		{  
			if (lastSelectedNoteData !== null)
			{
				if (!dataSavedBeforeClosing)
				{
					dataSavedBeforeClosing = true
					ev.preventDefault()
					ev.returnValue = ""
					SaveNote(lastSelectedNoteData)
					setTimeout(() => {
						window.close()
					}, 1000)
				}
			}
		})

		return () => { beforeunloadEvent.Delete() }
	}, [lastSelectedNoteData])*/

	return (
		<SelectedNote>
			<NotePageWrapper/>
		</SelectedNote>
	)
}

function NotePageWrapper()
{
	const selectedNote = useSelectedNote()

	const [selectedProject, setSelectedProject] = useState<Project | undefined>()
	
	const createNote = async () => 
	{
		await DataApi.createNote({
			title: "Untitled",
			content: "Your amazing note content",
			tags: [], project: selectedProject ? selectedProject.getId() : undefined
		})
	}

	return (
		<NotesLayout>
			<Projects
				selectedProject={selectedProject}
				onProjectChanged={(project: Project | undefined) => 
				{
					setSelectedProject(project)
				}}
			/> 
			<NoteList
				project={selectedProject}
				createNote={createNote}
			/>
			{selectedNote.note ? <NoteViewer/> : <DefaultStarter/>}
		</NotesLayout>
	)
}

const DefaultStarterLayout = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-color: ${({theme}) => theme.notes.content.backgroundColor};
	color: ${({theme}) => theme.notes.content.textColorHint};

	font-size: 4rem;
	font-style: italic;
`

function DefaultStarter()
{
	return (
		<DefaultStarterLayout>
			Select or create a note to start.
		</DefaultStarterLayout>
	)
}