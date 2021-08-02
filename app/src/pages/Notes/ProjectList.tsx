import styled from "styled-components"
import { useContext, useRef, useState } from "react"
import { DataContext } from "Data"
import { Project } from "softwiki-core/models/Project"
import DataApi from "softwiki-core/data/DataApi"
import Modal from "components/Modal"
import ProjectEditor from "components/ProjectEditor"
import { ContextMenu, ContextMenuItem, ContextMenuSpacer } from "components/ContextMenu"
import { AppUtilsController } from "AppUtils"

const ProjectsLayout = styled.div`
	display: flex;
	flex-direction: column;

	background-color: ${({theme}) => theme.projects.list.backgroundColor};
`

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	background-color: ${({theme}) => theme.projects.list.headerColor};
	padding: 8px;
`

const ProjectsWrapper = styled.div`
	padding: 8px;
`

const AddButton = styled.button`
	background: none;
	color: ${({theme}) => theme.notes.list.cardColor};
	border: 2px solid ${({theme}) => theme.notes.list.cardColor};
	border-radius: 4px;

	font-weight: bold;

	cursor: pointer;
	margin-left: 16px;

	&:hover
	{
		color: ${({theme}) => theme.notes.list.cardColorHover};
		border: 2px solid ${({theme}) => theme.notes.list.cardColorHover};
	}
`

interface ProjectsProps {
	OnProjectChanged: (project: Project | undefined) => void
	selectedProject?: Project | undefined
}

export default function Projects(props: ProjectsProps)
{
	const {projects} = useContext(DataContext)
	const [showNewProjectModal, SetShowNewProjectModal] = useState<boolean>(false)
	const [currentProjectEdit, SetCurrentProjectEdit] = useState<Project | undefined>(undefined)

	return (
		<ProjectsLayout>
			{showNewProjectModal ?
				<Modal OnClickOutside={() => { SetShowNewProjectModal(false) }}>
					<ProjectEditor project={currentProjectEdit} OnSave={() => { SetShowNewProjectModal(false) }}/>
				</Modal> : ""}
			<Header>
				Projects
				<AddButton onClick={() => { SetShowNewProjectModal(true) }}>+</AddButton>
			</Header>
			<ProjectsWrapper>
				<ProjectCard selected={props.selectedProject === undefined} project={undefined} OnClick={() => { props.OnProjectChanged(undefined) }}/>
				{projects.map((project: Project) => {
					
					return (
						<ProjectCard
							project={project}
							selected={props.selectedProject?._GetID() === project._GetID()}
							OnClick={() => { props.OnProjectChanged(project) }}
							OnEdit={() => { 
								SetCurrentProjectEdit(project)
								SetShowNewProjectModal(true)
							}}
							OnDelete={() => {
								AppUtilsController.PopConfirmationBox(`Do you really want to delete the project "${project.GetName()}" ?`, () => {
									project.Delete()
								})
							}}
						/>
					)

				})}
			</ProjectsWrapper>
			
		</ProjectsLayout>
	)
}

const ProjectCardWrapper = styled.div`

`

interface ProjectCardLayoutProps
{
	selected?: boolean
}

const ProjectCardLayout = styled.div<ProjectCardLayoutProps>`
	display: flex;
	flex-direction: row; 
	justify-content: space-between;
	align-items: center;

	padding: 4px;

	//background-color: ${({theme}) => theme.notes.list.cardColor};
	border-radius: 4px;

	cursor: pointer;

	transition-duration: 0.25s;

	:not(:last-child)
	{
		margin-bottom: 4px;
	}

	&:hover
	{
		background-color: ${({theme}) => theme.projects.card.backgroundColorHover}
	}

	${({selected, theme}) => selected ? `background-color: ${theme.projects.card.backgroundColorSelected}` : ""};
`

const ProjectName = styled.h3`
	margin: 0;
	font-weight: normal;
`

const NoteCount = styled.p`
	margin: 0;
	margin-left: 32px;

	font-size: 0.75rem;
`

interface ProjectCardProps
{
	project: Project | undefined
	OnClick: () => void
	selected?: boolean
	OnEdit?: () => void
	OnDelete?: () => void
}

function ProjectCard({project, selected = false, OnClick, OnEdit, OnDelete}: ProjectCardProps)
{
	const contextMenuTrigger = useRef(null)

	const name = project ? project.GetName() : "All"
	const count = project ? project.NoteCount() : DataApi.GetNotes().length


	return (
		<ProjectCardWrapper>
			<ProjectCardLayout selected={selected} onClick={OnClick} ref={contextMenuTrigger}>
				<ProjectName>{name}</ProjectName>
				<NoteCount>{count}</NoteCount>
			</ProjectCardLayout>

			<ContextMenu trigger={project ? contextMenuTrigger : undefined}>
				<ContextMenuItem value="Edit" action={() => { OnEdit && OnEdit() }}/>
				<ContextMenuSpacer/>
				<ContextMenuItem value="Delete" textColor="rgb(200, 100, 100)" action={() => { OnDelete && OnDelete() }}/>
			</ContextMenu>
		</ProjectCardWrapper>
	)
}