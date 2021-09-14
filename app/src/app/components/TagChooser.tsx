import styled from "styled-components"
import { Tag } from "libs/softwiki-core/src/objects"
import TagCard from "./TagCard"
import { useContext } from "react"
import { DataContext } from "app/Data"

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
	onTagSelected: (tag: Tag) => void
}

export default function TagChooser(props: TagChooserArguments & any) {
	const {tags} = useContext(DataContext)
	return (
		<TagChooserLayout {...props}>
			{
				tags.map((tag: Tag) => {
					return (
						<TagCardWrapper key={tag.getId()}>
							<TagCard
								tag={tag}
								style={{flex: 1}}
								onClick={() => {props.OnTagSelected(tag)}}
							/>
						</TagCardWrapper>
					)
				})
			}
		</TagChooserLayout>
	)
}