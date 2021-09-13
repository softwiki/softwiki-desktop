import AddButton from "app/components/AddButton";
import { ContextMenu, ContextMenuItem, ContextMenuSpacer } from "app/components/ContextMenu";
import TagEditor, { Color } from "app/components/TagEditor";
import { useData } from "app/Data";
import { useGlobalState } from "app/GlobalState";
import { useMessage } from "app/messages";
import React, { useRef } from "react";
import { Tag } from "libs/softwiki-core/src/objects";
import styled from "styled-components";
import { Header } from "./common";

const TagsLayout = styled.div`
	
`

const TagsCard = styled.div`
	padding: 8px;
`

export function Tags()
{
	const {tags, api} = useData();
	const {pushModal, closeModal, pushErrorIfFails} = useMessage()

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
						<TagEditor
							name="Untitled"
							color={{r: 200, g: 100, b: 100, a: 1}}
							onChange={async (name: string, color: Color) =>
							{
								pushErrorIfFails(async () =>
								{
									await api.createTag({name, color});
									closeModal()
								}, () =>
								{
									closeModal();
								});
							}}
						/>
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
						<TagEditor
							name={tag.getName()}
							color={tag.getColor()}
							onChange={async (name: string, color: Color) =>
							{
								await tag.setAll({name, color});
								closeModal()
							}}
						/>
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