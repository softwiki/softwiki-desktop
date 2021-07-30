import TagCard from "Components/TagCard";
import { Tag } from "SoftWiki-Core/Models";
import { useState } from "react";
import styled from "styled-components";
import filtersImage from "Images/filters.png"
import Popup from "Components/Popup";

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
	OnChange: (tags: Tag[]) => void
}

export default function TagsFilter({tags, OnChange}: TagsFilterArguments)
{
	const [showPopup, SetShowPopup] = useState<boolean>(false)
	const [selectedTags, SetSelectedTags] = useState<Tag[]>([])
	
	const IsSelected = (tag: Tag) : boolean => {
		return selectedTags.find((selectedTag: Tag) => tag._GetID() === selectedTag._GetID()) !== undefined
	}

	const ToggleTag = (tag: Tag) => {
		let tagsSelection = [...selectedTags]
		if (!IsSelected(tag))
		{
			tagsSelection.push(tag)
		}
		else
		{
			tagsSelection.splice(tagsSelection.findIndex((selectedTag: Tag) => tag._GetID() === selectedTag._GetID()))
		}

		SetSelectedTags(tagsSelection)
		OnChange(tagsSelection)
	}

	return (
		<TagsFilterLayout>
			<FilsterIconnWrapper onClick={() => { SetShowPopup(!showPopup) }}>
				<FiltersIcon src={filtersImage}/>
			</FilsterIconnWrapper>
			
			<Popup show={showPopup} OnClickOutside={() => { setTimeout(() => {SetShowPopup(false)}) }}>
			{
				tags.map((tag: Tag) => {
					return (
						<TagCardWrapper>
							<TagCard
								OnClick={() => { ToggleTag(tag) }}
								style={{opacity: IsSelected(tag) ? "1" : "0.5", flex: "1"}}
								tag={tag}/>
						</TagCardWrapper>
					)
				})
			}	
			</Popup>
		</TagsFilterLayout>
	)
}