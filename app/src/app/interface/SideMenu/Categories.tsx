import styled from "styled-components"
import { useRef } from "react"
import { useData } from "app/Data"
import { Category } from "libs/softwiki-core/src/objects"
import CategoryEditor from "app/components/CategoryEditor"
import { ContextMenu, ContextMenuItem, ContextMenuSpacer } from "app/components/ContextMenu"
import { useMessage } from "app/messages";
import { Header } from "./common";
import { useGlobalState } from "app/GlobalState";
import AddButton from "app/components/AddButton";

const CategoriesLayout = styled.div`
	cursor: pointer;
`

const CategoriesCard = styled.div`
	padding: 8px;
`

export default function Categories() {
	const {categories, notes, api} = useData();
	const {pushConfirmationMessage, pushModal, closeModal, pushErrorIfFails} = useMessage();

	const {selectedCategory, selectCategory} = useGlobalState();

	categories.sort((a: Category, b: Category) => {
		return a.getName() > b.getName() ? 1 : -1;
	});

	let uncategorizedNotesCount = notes.length;
	categories.forEach((category: Category) => uncategorizedNotesCount -= category.getNoteCount());

	return (
		<CategoriesLayout>
			<Header>
				<span>Categories</span>
				<AddButton
					onClick={() => {
						pushModal(
							<CategoryEditor
								name="Untitled"
								onChange={(name: string) => {
									pushErrorIfFails(async () => {
										await api.createCategory({name})
										closeModal();
									})
								}}
							/>
						)
					}}
				/>
			</Header>
			<CategoriesCard>
				<CategoryCard name="Uncategorized" count={uncategorizedNotesCount} contextMenuDisabled onClick={() => { selectCategory(null) }}/>
				{categories.map((category: Category) => {
					return (
						<CategoryCard
							key={category.getId()}
							name={category.getName()}
							count={category.getNoteCount()}
							selected={category.getId() === selectedCategory?.getId()}
							onClick={() => { selectCategory(category) }}
							onEdit={() => {
								pushModal(
									<CategoryEditor
										name={category.getName()}
										onChange={(name: string) => {
											pushErrorIfFails(async () => {
												if (name !== category.getName())
													await category.setName(name)
												closeModal();
											})
										}}
									/>
								)
							}}
							onDelete={() => {
								pushConfirmationMessage(`Do you really want to delete the category "${category.getName()}" ?`, () => {
									category.delete()
								})
							}}
						/>
					)
				})}
			</CategoriesCard>	
		</CategoriesLayout>
	)
}

const CategoryCardWrapper = styled.div`

`

interface CategoryCardLayoutProps
{
	selected?: boolean
}

const CategoryCardLayout = styled.div<CategoryCardLayoutProps>`
	display: flex;
	flex-direction: row; 
	justify-content: space-between;
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
`

const CategoryName = styled.h3`
	margin: 0;
	font-weight: normal;
`

const NoteCount = styled.p`
	margin: 0;
	margin-left: 32px;

	font-size: 0.75rem;
`

interface CategoryCardProps
{
	name: string
	count: number
	contextMenuDisabled?: boolean
	onClick: () => void
	selected?: boolean
	onEdit?: () => void
	onDelete?: () => void
}

function CategoryCard({name, count, contextMenuDisabled, selected = false, onClick, onEdit, onDelete}: CategoryCardProps) {
	const contextMenuTrigger = useRef(null)

	return (
		<CategoryCardWrapper>
			<CategoryCardLayout selected={selected} onClick={onClick} ref={contextMenuTrigger}>
				<CategoryName>{name}</CategoryName>
				<NoteCount>{count}</NoteCount>
			</CategoryCardLayout>

			<ContextMenu trigger={contextMenuDisabled ? undefined : contextMenuTrigger}>
				<ContextMenuItem value="Edit" action={() => { onEdit && onEdit() }}/>
				<ContextMenuSpacer/>
				<ContextMenuItem value="Delete" textColor="rgb(200, 100, 100)" action={() => { onDelete && onDelete() }}/>
			</ContextMenu>
		</CategoryCardWrapper>
	)
}