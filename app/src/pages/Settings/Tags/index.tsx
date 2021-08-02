import Button from "components/Button"
import { Color, Tag } from "softwiki-core/models"
import { useContext, useState } from "react"
import styled from "styled-components"

import TagEditor from "./TagEditor"
import { AppUtilsController } from "AppUtils"
import { DataContext } from "Data"
import DataApi from "softwiki-core/data/DataApi"

const TagsSettingsLayout = styled.div`

`

const NewTagButton = styled(Button)`
	margin-left: 4px;
	margin-right: 4px;
	background: none;
`

export default function TagsSettings()
{
	const [newTagColor, SetNewTagColor] = useState<Color>({r: 0, g: 0, b: 0, a: 1})
	const [showNewTagField, SetShowNewTagField] = useState<boolean>(false)

	const { tags } = useContext(DataContext)

	return (
		<TagsSettingsLayout>
			{
				tags.map((tag: Tag) => 
				{
					return <TagEditor
						key={tag.Id()}
						initialName={tag.GetName()}
						initialColor={tag.GetColor()}
						OnChange={async (name: string, color: Color) => 
						{
							tag.SetAll({name, color})
						}}
						OnDelete={() => 
						{
							AppUtilsController.PopConfirmationBox(`Do you really want to delete the tag "${tag.GetName()}" ?`, () => 
							{
								tag.Delete()
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
						OnNameChange={async (name: string, color: Color) => 
						{
							DataApi.CreateTag({name, color})
							SetNewTagColor({...newTagColor})
							SetShowNewTagField(false)
						}}
					/>
					:
					<NewTagButton onClick={() => { SetShowNewTagField(true) }}>
						+ Add tag
					</NewTagButton>
				}
			</div>
		</TagsSettingsLayout>
	)
}