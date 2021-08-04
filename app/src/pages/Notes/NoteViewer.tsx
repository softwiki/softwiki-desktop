import styled from "styled-components"
import {ChangeEvent} from "react"

import Input from "components/Input"
import TextArea from "components/TextArea"

import Markdown from "components/Markdown"
import NoteTagsBar from "./NoteTagsBar"

import { useSelectedNote } from "./SelectedNote"
import ActionBar from "./ActionBar"

const NoteEditLayout = styled.div`
	flex: 1;

	display: flex;
	flex-direction: column;

	overflow-y: scroll;

	background-color: ${({theme}) => theme.notes.content.backgroundColor};
	color: ${({theme}) => theme.notes.content.textColor};
`

const EditWithPreview = styled.div`
	display: flex;
	flex-direction: row;

	flex: 1;
`

const Preview = styled.div`
	flex: 1;
	padding: 8px;

	overflow: hidden;

	height: 100%;
`

const EditZone = styled.div`
	display: flex;
	flex-direction: column;

	flex: 1;

	padding: 8px;
`

const Title = styled.h1`
	margin-top: 0;
`

export default function NoteViewer()
{
	const selectedNote = useSelectedNote()

	const handleTitleChanges = (e: ChangeEvent<HTMLInputElement>) => 
	{
		selectedNote.setUnsavedChanges({title: e.target.value, content: selectedNote.unsavedChanges.content})
	}

	const handleContentChanges = (e: ChangeEvent<HTMLTextAreaElement>) =>
	{
		selectedNote.setUnsavedChanges({title: selectedNote.unsavedChanges.title, content: e.target.value})
	}

	return (
		<NoteEditLayout>
			<ActionBar/>
			<EditWithPreview>
				{
					selectedNote.editModeEnabled ? 
						<EditZone>
							<Input type="text" value={selectedNote.unsavedChanges.title} onChange={handleTitleChanges}/>
							<TextArea value={selectedNote.unsavedChanges.content} onChange={handleContentChanges} style={{
								flex: "1",
								marginTop: "4px"
							}}/>
						</EditZone>
						:
						""
				}

				<Preview>
					<Title>{selectedNote.unsavedChanges.title}</Title>
					<NoteTagsBar/>
					<Markdown>
						{"---\n" + selectedNote.unsavedChanges.content}
					</Markdown>
				</Preview>
			</EditWithPreview>
		</NoteEditLayout>
	)
}