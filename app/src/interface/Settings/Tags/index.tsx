import Button from "components/Button"
import { Color, Tag } from "softwiki-core/models"
import { useState } from "react"
import styled from "styled-components"

import TagEditor from "./TagEditor"
import { useData } from "Data"
import { useNotification } from "notifications/confirmationMessage";

const TagsSettingsLayout = styled.div`

`

const NewTagButton = styled(Button)`
	margin-left: 4px;
	margin-right: 4px;
	background: none;
`

export default function TagsSettings()
{
	const [newTagColor, setNewTagColor] = useState<Color>({r: 0, g: 0, b: 0, a: 1})
	const [showNewTagField, setShowNewTagField] = useState<boolean>(false)

	const { tags, api } = useData()
	const { popConfirmationMessage } = useNotification();

	return (
		<TagsSettingsLayout>
			{
				tags.map((tag: Tag) => 
				{
					return <TagEditor
						key={tag.getId()}
						initialName={tag.getName()}
						initialColor={tag.getColor()}
						onChange={async (name: string, color: Color) => 
						{
							tag.setAll({name, color})
						}}
						onDelete={() => 
						{
							popConfirmationMessage(`Do you really want to delete the tag "${tag.getName()}" ?`, () => 
							{
								tag.delete()
							})
						}}
					/>
				})
			}
			<div>
				{ showNewTagField ?
					<TagEditor
						editDefault
						initialName={"New Tag"}
						initialColor={newTagColor}
						onNameChange={async (name: string, color: Color) => 
						{
							api.createTag({name, color})
							setNewTagColor({...newTagColor})
							setShowNewTagField(false)
						}}
					/>
					:
					<NewTagButton onClick={() => { setShowNewTagField(true) }}>
						+ Add tag
					</NewTagButton>
				}
			</div>
		</TagsSettingsLayout>
	)
}