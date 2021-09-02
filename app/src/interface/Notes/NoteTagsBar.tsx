import Button from "components/Button";
import Popup from "components/Popup";
import TagCard from "components/TagCard";
import TagChooser from "components/TagChooser";
import { Tag } from "softwiki-core/objects";
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

export default function NoteTagsBar()
{
	const selectedNote = useSelectedNote()
	const note = selectedNote.note
	const [addTagWidget, setAddTagWidget] = useState<boolean>(false)

	if (!note) return <></>

	return (
		<TagsBarLayout>
			{
				note.getTags().map((tag: Tag) => 
				{
					return <TagCard
						key={tag.getId()}
						tag={tag}
						style={{marginRight: "8px"}}
						onCrossClick={() => {note.removeTag(tag)}}
					/>
				})
			}
		
			<AddTagButtonWrapper>
				<AddTagButton
					style={{backgroundColor: "rgba(0, 0, 0, 0)", "border": "1px solid rgb(75, 75, 75)"}}
					onClick={() => 
					{
						if (!addTagWidget)
							setAddTagWidget(true)
					}
					}>
					+ Add Tag
				</AddTagButton>
				<Popup show={addTagWidget} onClickOutside={() => { setTimeout(() => {setAddTagWidget(false)}) }}>
					<TagChooser
						OnTagSelected={(tag: Tag) => 
						{
							if (note.hasTag(tag))
								return ;
							note.addTag(tag)
							setAddTagWidget(false);
						}}
					/>
				</Popup>
			</AddTagButtonWrapper>
		</TagsBarLayout>
	)
}