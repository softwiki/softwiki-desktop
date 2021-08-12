import styled from "styled-components"
import { useRef, useState } from "react"
import { useData } from "Data"
import { Project } from "softwiki-core/models"
import Modal from "components/Modal"
import ProjectEditor from "components/ProjectEditor"
import { ContextMenu, ContextMenuItem, ContextMenuSpacer } from "components/ContextMenu"
import { useNotification } from "notifications";
import { Header } from "./common";
import { useGlobalState } from "GlobalState";
import AddButton from "components/AddButton";

const ProjectsLayout = styled.div`
	cursor: pointer;
`

const ProjectsCard = styled.div`
	padding: 8px;
`

export default function Projects()
{
	const {projects} = useData();
	const {popConfirmationMessage} = useNotification();
	const [showNewProjectModal, setShowNewProjectModal] = useState<boolean>(false)
	const [currentProjectEdit, setCurrentProjectEdit] = useState<Project | undefined>(undefined)

	const {selectedProject, selectProject} = useGlobalState();

	projects.sort((a: Project, b: Project) =>
	{
		return a.getName() > b.getName() ? 1 : -1;
	});

	return (
		<ProjectsLayout>
			{showNewProjectModal ?
				<Modal onClickOutside={() => { setShowNewProjectModal(false) }}>
					<ProjectEditor project={currentProjectEdit} onSave={() => { setShowNewProjectModal(false) }}/>
				</Modal> : ""}
			<Header>
				<span>Projects</span>
				<AddButton onClick={() => { setShowNewProjectModal(true) }}/>
			</Header>
			<ProjectsCard>
				<ProjectCard selected={selectedProject === null} project={undefined} onClick={() => { selectProject(null) }}/>
				{projects.map((project: Project) => 
				{
					return (
						<ProjectCard
							key={project.getId()}
							project={project}
							selected={project.getId() === selectedProject?.getId()}
							onClick={() => { selectProject(project) }}
							onEdit={() => 
							{
								setCurrentProjectEdit(project)
								setShowNewProjectModal(true)
							}}
							onDelete={() => 
							{
								popConfirmationMessage(`Do you really want to delete the project "${project.getName()}" ?`, () => 
								{
									project.delete()
								})
							}}
						/>
					)
				})}
			</ProjectsCard>	
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

	//transition-duration: 0.10s;

	:not(:last-child)
	{
		margin-bottom: 4px;
	}

	&:hover
	{
		background-color: ${({theme}) => theme.projects.card.colorHover}
	}

	${({selected, theme}) => selected ? `background-color: ${theme.projects.card.colorSelected}` : ""};
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
	onClick: () => void
	selected?: boolean
	onEdit?: () => void
	onDelete?: () => void
}

function ProjectCard({project, selected = false, onClick, onEdit, onDelete}: ProjectCardProps)
{
	const contextMenuTrigger = useRef(null)
	const { notes } = useData();

	const name = project ? project.getName() : "All"
	const count = project ? project.getNoteCount() : notes.length

	return (
		<ProjectCardWrapper>
			<ProjectCardLayout selected={selected} onClick={onClick} ref={contextMenuTrigger}>
				<ProjectName>{name}</ProjectName>
				<NoteCount>{count}</NoteCount>
			</ProjectCardLayout>

			<ContextMenu trigger={project ? contextMenuTrigger : undefined}>
				<ContextMenuItem value="Edit" action={() => { onEdit && onEdit() }}/>
				<ContextMenuSpacer/>
				<ContextMenuItem value="Delete" textColor="rgb(200, 100, 100)" action={() => { onDelete && onDelete() }}/>
			</ContextMenu>
		</ProjectCardWrapper>
	)
}