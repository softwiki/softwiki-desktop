import styled from "styled-components"
import {ChangeEvent, useRef} from "react"

import Input from "app/components/Input"
import TextArea from "app/components/TextArea"

import Markdown from "app/components/Markdown"
import NoteTagsBar from "./NoteTagsBar"

import { useSelectedNote } from "./SelectedNote"
import ActionBar from "./ActionBar"

const NoteEditLayout = styled.div`
	flex: 1;

	display: flex;
	flex-direction: column;


	background-color: ${({theme}) => theme.notes.content.color};
	color: ${({theme}) => theme.notes.content.textColor};
`

const Content = styled.div`

	display: flex;
	flex-direction: row;
	padding: 8px;

	flex: 1;

	overflow: hidden;
`

const EditZone = styled.div`
	display: flex;
	flex-direction: column;

	flex: 1;
	padding: 8px;
`

const MarkdownWrapper = styled.div`
	flex: 1;
	overflow-y: scroll;
`

const Header = styled.div`
	display: flex;
	flex-direction: column;
	
	box-shadow: 0px 4px 4px -4px rgb(0, 0, 0, 0.5);
	padding: 8px;
`

export default function NoteViewer() {
	const selectedNote = useSelectedNote()

	const handleTitleChanges = (e: ChangeEvent<HTMLInputElement>) => {
		selectedNote.setUnsavedChanges({title: e.target.value, content: selectedNote.unsavedChanges.content})
	}

	const handleContentChanges = (e: ChangeEvent<HTMLTextAreaElement>) => {
		selectedNote.setUnsavedChanges({title: selectedNote.unsavedChanges.title, content: e.target.value})
	}

	const markdownDivRef = useRef<HTMLDivElement>(null)
	const editorDivRef = useRef<HTMLTextAreaElement>(null)
	const preventScroll = useRef(false)

	const syncDivScrolls = (source: any, target: any) => {
		const topPositionPertentage = source.scrollTop / (source.scrollHeight - source.offsetHeight)
		target.scrollTo(0, (target.scrollHeight - target.offsetHeight) * topPositionPertentage);
	}

	return (
		<NoteEditLayout>
			<Header>
				<ActionBar/>
				<NoteTagsBar/>
			</Header>
			<Content>
				{
					selectedNote.editModeEnabled ? 
						<EditZone>
							<Input type="text" value={selectedNote.unsavedChanges.title} onChange={handleTitleChanges}/>
							<TextArea
								value={selectedNote.unsavedChanges.content}
								onChange={handleContentChanges}
								style={{
									flex: "1",
									marginTop: "4px"
								}}
								ref={editorDivRef}
								onScroll={() => {
									if (preventScroll.current) {
										preventScroll.current = false;
										return
									}
									const editorDiv = editorDivRef.current
									if (!editorDiv) return ;
									const markdownDiv = markdownDivRef.current
									if (!markdownDiv) return ;
									
									preventScroll.current = true
									syncDivScrolls(editorDiv, markdownDiv)
								}}
							/>
						</EditZone>
						:
						""
				}
				<MarkdownWrapper
					ref={markdownDivRef}
					onScroll={() => {
						if (preventScroll.current) {
							preventScroll.current = false;
							return
						}
						const editorDiv = editorDivRef.current
						if (!editorDiv) return ;
						const markdownDiv = markdownDivRef.current
						if (!markdownDiv) return ;

						preventScroll.current = true
						syncDivScrolls(markdownDiv, editorDiv)
					}}
				>
					<Markdown>
						{selectedNote.unsavedChanges.content}
					</Markdown>
				</MarkdownWrapper>
			</Content>
		</NoteEditLayout>
	)
}