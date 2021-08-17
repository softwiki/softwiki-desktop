import AddButton from "components/AddButton";
import { ContextMenu, ContextMenuItem, ContextMenuSpacer } from "components/ContextMenu";
import TagEditor from "components/TagEditor";
import { useData } from "Data";
import { useGlobalState } from "GlobalState";
import { useMessage } from "messages";
import React, { useRef } from "react";
import { Tag } from "softwiki-core/objects";
import styled from "styled-components";
import { Header } from "./common";

const TagsLayout = styled.div`
	
`

const TagsCard = styled.div`
	padding: 8px;
`

export function Tags()
{
	const {tags} = useData();
	const {pushModal, closeModal} = useMessage()

	tags.sort((a: Tag, b: Tag) =>
	{
		return a.getName() > b.getName() ? 1 : -1;
	})

	return (
		<TagsLayout>
			<Header>
				<span>Tags</span>
				<AddButton onClick={() =>
				{
					pushModal(
						<TagEditor tag={null} onSave={() => { closeModal() }}/>
					)
				}}/>
			</Header>
			<TagsCard>
				{
					tags.map((tag: Tag) =>
					{
						return (
							<TagCard key={tag.getId()}  tag={tag} />
						)
					})
				}
			</TagsCard>
		</TagsLayout>
	)
}

const TagCardLayout = styled.div<{selected?: boolean}>`
	display: flex;
	flex-direction: row; 
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
		background-color: ${({theme}) => theme.categories.card.colorHover}
	}

	${({selected, theme}) => selected ? `background-color: ${theme.categories.card.colorSelected}` : ""};
	${/*({selected, theme}) => selected ?
		`background: linear-gradient(90deg, ${theme.categories.card.colorSelected} 0%, ${theme.categories.card.colorSelected} 50%, rgba(0, 200, 100, 0.5) 100%)`
		:*/ ""};
`

const TagColor = styled.div<{c: {r: number, g: number, b: number, a?: number}}>`
	border-radius: 128px;
	width: 8px;
	height: 8px;
	margin-right: 4px;

	background-color: ${({c}) => `rgb(${c.r}, ${c.g}, ${c.b}, ${c.a ? c.a : 1})`};
`

interface TagCardProps
{
	tag: Tag
}

export function TagCard({tag}: TagCardProps)
{
	const contextMenuTrigger = useRef(null);
	const {pushModal, closeModal, pushConfirmationMessage} = useMessage();
	const {tagFilters, addTagToFilters, removeTagFromFilters, resetTagFilters, isTagFiltered} = useGlobalState();

	return (
		<>
			<TagCardLayout
				ref={contextMenuTrigger}
				selected={isTagFiltered(tag)}
				onClick={(e: React.MouseEvent) =>
				{
					if (e.ctrlKey && !isTagFiltered(tag))
					{
						addTagToFilters(tag);
						return ;
					}
					else if (e.ctrlKey && isTagFiltered(tag))
					{
						removeTagFromFilters(tag);
						return ;
					}
					else if (isTagFiltered(tag) && tagFilters.length === 1)
					{
						resetTagFilters();
						return ;
					}
					resetTagFilters([tag]);
				}}
			>
				<TagColor c={tag.getColor()}/>
				<span>{tag.getName()}</span>
			</TagCardLayout>
			<ContextMenu trigger={contextMenuTrigger}>
				<ContextMenuItem value="Edit" action={() =>
				{
					pushModal(
						<TagEditor tag={tag} onSave={() => { closeModal() }}/>
					)
				}}/>
				<ContextMenuSpacer/>
				<ContextMenuItem
					value="Delete" textColor="rgb(200, 100, 100)"
					action={() =>
					{
						pushConfirmationMessage(`Do you really want to delete the tag "${tag.getName()}" ?`, () => 
						{
							tag.delete()
						})
					}}
				/>
			</ContextMenu>
		</>
	)
}