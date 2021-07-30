import styled from "styled-components"
import {ChangeEvent} from "react"

import Input from "Components/Input"
import TextArea from "Components/TextArea"

import Markdown from "Components/Markdown"
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

interface NoteEditArguments
{
}

export default function NoteViewer(props: NoteEditArguments)
{
	const selectedNote = useSelectedNote()

	var HandleTitleChanges = (e: ChangeEvent<HTMLInputElement>) => {
		selectedNote.SetUnsavedChanges({title: e.target.value, content: selectedNote.unsavedChanges.content})
	}

	var HandleContentChanges = (e: ChangeEvent<HTMLTextAreaElement>) =>{
		selectedNote.SetUnsavedChanges({title: selectedNote.unsavedChanges.title, content: e.target.value})
	}

	return (
		<NoteEditLayout>
			<ActionBar/>
			<EditWithPreview>
				{
					selectedNote.editModeEnabled ? 
						<EditZone>
							<Input type="text" value={selectedNote.unsavedChanges.title} onChange={HandleTitleChanges}/>
							<TextArea value={selectedNote.unsavedChanges.content} onChange={HandleContentChanges} style={{
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