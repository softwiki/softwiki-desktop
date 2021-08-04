import TagCard from "components/TagCard";
import { Tag } from "softwiki-core/models";
import { useState } from "react";
import styled from "styled-components";
import filtersImage from "images/filters.png"
import Popup from "components/Popup";

const TagsFilterLayout = styled.div`
	position: relative;
`

const TagCardWrapper = styled.div`
	display: flex;
	white-space: nowrap;

	:not(:first-child)
	{
		margin-top: 4px;
	}
`

const FilsterIconnWrapper = styled.div`
	padding: 4px;
	border-radius: 4px;
	background-color: ${({theme}) => theme.input.backgroundColor};
	cursor: pointer;
`

const FiltersIcon = styled.img`
	width: 16px;
	filter: invert(66%) sepia(98%) saturate(13%) hue-rotate(55deg) brightness(60%) contrast(87%);
`

interface TagsFilterArguments
{
	tags: Tag[]
	onChange: (tags: Tag[]) => void
}

export default function TagsFilter({tags, onChange}: TagsFilterArguments)
{
	const [showPopup, setShowPopup] = useState<boolean>(false)
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	
	const isSelected = (tag: Tag): boolean => 
	{
		return selectedTags.find((selectedTag: Tag) => tag.getId() === selectedTag.getId()) !== undefined
	}

	const toggleTag = (tag: Tag) => 
	{
		const tagsSelection = [...selectedTags]
		if (!isSelected(tag))
		{
			tagsSelection.push(tag)
		}
		else
		{
			tagsSelection.splice(tagsSelection.findIndex((selectedTag: Tag) => tag.getId() === selectedTag.getId()))
		}

		setSelectedTags(tagsSelection)
		onChange(tagsSelection)
	}

	return (
		<TagsFilterLayout>
			<FilsterIconnWrapper onClick={() => { setShowPopup(!showPopup) }}>
				<FiltersIcon src={filtersImage}/>
			</FilsterIconnWrapper>
			
			<Popup show={showPopup} onClickOutside={() => { setTimeout(() => {setShowPopup(false)}) }}>
				{
					tags.map((tag: Tag) => 
					{
						return (
							<TagCardWrapper>
								<TagCard
									onClick={() => { toggleTag(tag) }}
									style={{opacity: isSelected(tag) ? "1" : "0.5", flex: "1"}}
									tag={tag}/>
							</TagCardWrapper>
						)
					})
				}	
			</Popup>
		</TagsFilterLayout>
	)
}