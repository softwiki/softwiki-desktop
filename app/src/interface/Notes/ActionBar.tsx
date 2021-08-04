import styled from "styled-components"
import {useRef} from "react"

import Button from "components/Button"
import {AppUtilsController} from "AppUtils"

import menuIconHorizontale from "images/menuButton_horizontale.png"
import {useSelectedNote} from "./SelectedNote"
import {ContextMenu, ContextMenuItem, ContextMenuSpacer} from "components/ContextMenu"
import { useData } from "Data";
import { Project } from "softwiki-core/models/Project";

const ActionBarLayout = styled.div`

	position: relative;

	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;

	margin: 8px;
`

const NoteMenuIconWrapper = styled.div`
	padding-left: 4px;
	padding-right: 4px;
	padding: 4px;
	background: none;

	transition-duration: 0.25s;

	&:hover
	{
		background-color: rgb(125, 125, 125);
	}

	border-radius: 4px;

	display: flex;
`

const NoteMenuIcon = styled.img`
	width: 32px;
	filter: invert(66%) sepia(98%) saturate(13%) hue-rotate(55deg) brightness(87%) contrast(87%);
	height: 100%;
`

const SaveExitButton = styled(Button)`
	background-color: rgb(100, 150, 100);
	margin-right: 16px;
`

const ProjectName = styled.div`
	margin-right: auto;
	
	opacity: 0.5;
	cursor: pointer;

	transition-duration: 0.25s;

	&:hover
	{
		opacity: 1;
	}

`

export default function ActionBar()
{
	const selectedNote = useSelectedNote()
	const contextMenuTrigger = useRef(null)
	const projectContextMenuTrighger = useRef(null)
	const { projects } = useData()

	return (
		<ActionBarLayout>
			<ProjectName ref={projectContextMenuTrighger}>
				{selectedNote.note?.getProject()?.getName() || "Uncategorized"}
			</ProjectName>
			<ContextMenu
				trigger={projectContextMenuTrighger}
				absolutePosition={{top: "125%", left: "0"}}
				useLeftClick
			>
				<>
					{
						projects.map((project: Project) =>
						{
							return (
								<ContextMenuItem
									key={project.getId()}
									value={project.getName()}
									action={() => 
									{
										selectedNote.note?.setProject(project);
									}}
								/>
							);
						})
					}
				</>
				<ContextMenuSpacer/>
				<ContextMenuItem
					value="Uncategorized"
					textColor="rgb(200, 100, 100"
					action={() => 
					{
						selectedNote.note?.setProject(null);
					}}
				/>
			</ContextMenu>
			{
				selectedNote.editModeEnabled
					? 
					<SaveExitButton onClick={() => 
					{
						selectedNote.save()
						selectedNote.setEditModeEnabled(false)
					}}>Save & Exit</SaveExitButton>
					: ""
			}
			<div style={{position: "relative", cursor: "pointer"}}>
				<NoteMenuIconWrapper ref={contextMenuTrigger}>
					<NoteMenuIcon src={menuIconHorizontale}/>
				</NoteMenuIconWrapper>
				<ContextMenu trigger={contextMenuTrigger} absolutePosition={{top: "125%", right: "0"}} useLeftClick>
					<ContextMenuItem value="Edit" action={() => 
					{
						if (selectedNote.editModeEnabled)
							selectedNote.save()
						selectedNote.setEditModeEnabled(!selectedNote.editModeEnabled)
					}}/>
					<ContextMenuItem value="Save" action={() => 
					{
						selectedNote.save()
					}}/>
					<ContextMenuSpacer/>
					<ContextMenuItem value="Delete" textColor="rgb(200, 100, 100)" action={() => 
					{
						AppUtilsController.popConfirmationBox(`Do you really want to delete the note "${selectedNote.note?.getTitle()}" ?`, () => 
						{
							selectedNote.delete()
						})
					}}/>
				</ContextMenu>
			</div>
		</ActionBarLayout>
	)
}