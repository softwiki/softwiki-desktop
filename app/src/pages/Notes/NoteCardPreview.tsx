import TagCard from "components/TagCard"
import { Note, Tag } from "softwiki-core/models"
import { useRef } from "react"
import styled from "styled-components"

const NoteCardPreviewLayout = styled.div`
	padding: 8px;
	:not(:first-child)
	{
		//margin-top: 4px;
	}

	//background-color: ${({theme}) => theme.notes.list.cardColor};
	border-bottom: 1px solid ${({theme}) => theme.notes.list.colorBorderColor};
	color: ${({theme}) => theme.notes.list.cardTextColor};
	cursor: pointer;
	transition-duration: 0.25s;

	&:hover
	{
		background-color: ${({theme}) => theme.notes.list.cardColorHover};
	}
`

const NoteCardPreviewTags = styled.div`
	display: flex;
	flex-direction: row;

	margin-top: 8px;
`

export default function NoteCardPreview(props: {note: Note, onClick: () => void})
{
	const contextMenuTrigger = useRef(null)
	return (
		<NoteCardPreviewLayout onClick={() => {props.onClick()}} ref={contextMenuTrigger}>
			<div>{props.note.GetTitle()}</div>
			<NoteCardPreviewTags>
				{
					props.note.GetTags().map((tag: Tag) => 
					{
						return <TagCard key={tag.Id()} tag={tag} style={{marginRight: "4px"}}/>
					})
				}
			</NoteCardPreviewTags>
			{/*<ContextMenu trigger={contextMenuTrigger}>
				<ContextMenuItem value="Edit"/>
				<ContextMenuSpacer/>
				<ContextMenuItem value="Delete" textColor="rgb(200, 100, 100"/>
			</ContextMenu>*/}
		</NoteCardPreviewLayout>
	)
}