import Button from "Components/Button";
import Popup from "Components/Popup";
import TagCard from "Components/TagCard";
import TagChooser from "Components/TagChooser";
import { Tag } from "SoftWiki-Core/Models";
import { useState } from "react";
import styled from "styled-components";
import { useSelectedNote } from "./SelectedNote";

const TagsBarLayout = styled.div`
	display: flex;
	flex-direction: row;
`

const AddTagButtonWrapper = styled.div`
	margin-right: 8px;
	position: relative;
	
`

const AddTagButton = styled(Button)`
	height: 100%;
`

interface NoteTagsBarProps
{

}

export default function NoteTagsBar(props: NoteTagsBarProps)
{
	const selectedNote = useSelectedNote()
	const note = selectedNote.note
	const [addTagWidget, SetAddTagWidget] = useState<boolean>(false)

	if (!note) return <></>


	return (
		<TagsBarLayout>
			{
				note.GetTags().map((tag: Tag) => {
					return <TagCard
								key={tag._GetID()}
								tag={tag}
								style={{marginRight: "8px"}}
								OnCrossClick={() => {note.RemoveTag(tag)}}
							/>
				})
			}
		
			<AddTagButtonWrapper>
				<AddTagButton
					style={{backgroundColor: "rgba(0, 0, 0, 0)", "border": "1px solid rgb(75, 75, 75)"}}
					onClick={() => {
						if (!addTagWidget)
							SetAddTagWidget(true)
					}
				}>
					+ Add Tag
				</AddTagButton>
				<Popup show={addTagWidget} OnClickOutside={() => { setTimeout(() => {SetAddTagWidget(false)}) }}>
					<TagChooser
						OnTagSelected={(tag: Tag) => {
							if (note.HasTag(tag))
								return ;
							note.AddTag(tag)
						}}
					/>
				</Popup>
			</AddTagButtonWrapper>
		</TagsBarLayout>
	)
}