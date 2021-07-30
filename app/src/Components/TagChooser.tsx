import styled from "styled-components"
import { Tag } from "SoftWiki-Core/Models"
import TagCard from "./TagCard"
import { useContext } from "react"
import { DataContext } from "Data"

const TagChooserLayout = styled.div`
	display: flex;
	flex-direction: column;

	color: white;
	cursor: pointer;
`

const TagCardWrapper = styled.div`
	display: flex;

	white-space: nowrap;

	:not(:first-child)
	{
		margin-top: 4px;
	}
`

interface TagChooserArguments
{
	OnTagSelected: Function
}

export default function TagChooser(props: TagChooserArguments & any)
{
	let {tags} = useContext(DataContext)
	return (
		<TagChooserLayout {...props}>
			{
				tags.map((tag: Tag) => {
					return (
						<TagCardWrapper key={tag._GetID()}>
							<TagCard
								tag={tag}
								style={{flex: 1}}
								OnClick={() => {props.OnTagSelected(tag)}}
							/>
						</TagCardWrapper>
					)
				})
			}
		</TagChooserLayout>
	)
}