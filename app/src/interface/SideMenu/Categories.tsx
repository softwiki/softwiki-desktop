import styled from "styled-components"
import { useRef, useState } from "react"
import { useData } from "Data"
import { Category } from "softwiki-core/objects"
import Modal from "components/Modal"
import CategoryEditor from "components/CategoryEditor"
import { ContextMenu, ContextMenuItem, ContextMenuSpacer } from "components/ContextMenu"
import { useMessage } from "messages";
import { Header } from "./common";
import { useGlobalState } from "GlobalState";
import AddButton from "components/AddButton";

const CategoriesLayout = styled.div`
	cursor: pointer;
`

const CategoriesCard = styled.div`
	padding: 8px;
`

export default function Categories()
{
	const {categories} = useData();
	const {pushConfirmationMessage} = useMessage();
	const [showNewCategoryModal, setShowNewCategoryModal] = useState<boolean>(false)
	const [currentCategoryEdit, setCurrentCategoryEdit] = useState<Category | undefined>(undefined)

	const {selectedCategory, selectCategory} = useGlobalState();

	categories.sort((a: Category, b: Category) =>
	{
		return a.getName() > b.getName() ? 1 : -1;
	});

	return (
		<CategoriesLayout>
			{showNewCategoryModal ?
				<Modal onClickOutside={() => { setShowNewCategoryModal(false) }}>
					<CategoryEditor category={currentCategoryEdit} onSave={() => { setShowNewCategoryModal(false) }}/>
				</Modal> : ""}
			<Header>
				<span>Categories</span>
				<AddButton onClick={() => { setShowNewCategoryModal(true) }}/>
			</Header>
			<CategoriesCard>
				<CategoryCard selected={selectedCategory === null} category={undefined} onClick={() => { selectCategory(null) }}/>
				{categories.map((category: Category) => 
				{
					return (
						<CategoryCard
							key={category.getId()}
							category={category}
							selected={category.getId() === selectedCategory?.getId()}
							onClick={() => { selectCategory(category) }}
							onEdit={() => 
							{
								setCurrentCategoryEdit(category)
								setShowNewCategoryModal(true)
							}}
							onDelete={() => 
							{
								pushConfirmationMessage(`Do you really want to delete the category "${category.getName()}" ?`, () => 
								{
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
	category: Category | undefined
	onClick: () => void
	selected?: boolean
	onEdit?: () => void
	onDelete?: () => void
}

function CategoryCard({category, selected = false, onClick, onEdit, onDelete}: CategoryCardProps)
{
	const contextMenuTrigger = useRef(null)
	const { notes } = useData();

	const name = category ? category.getName() : "All"
	const count = category ? category.getNoteCount() : notes.length

	return (
		<CategoryCardWrapper>
			<CategoryCardLayout selected={selected} onClick={onClick} ref={contextMenuTrigger}>
				<CategoryName>{name}</CategoryName>
				<NoteCount>{count}</NoteCount>
			</CategoryCardLayout>

			<ContextMenu trigger={category ? contextMenuTrigger : undefined}>
				<ContextMenuItem value="Edit" action={() => { onEdit && onEdit() }}/>
				<ContextMenuSpacer/>
				<ContextMenuItem value="Delete" textColor="rgb(200, 100, 100)" action={() => { onDelete && onDelete() }}/>
			</ContextMenu>
		</CategoryCardWrapper>
	)
}