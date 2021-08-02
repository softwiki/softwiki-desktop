import styled from "styled-components"
import { Note, Tag } from "softwiki-core/models"
import NoteCardPreview from "./NoteCardPreview"
import Input from "components/Input"
import TagsFilter from "./TagsFilter"
import { ChangeEvent, useState } from "react"
import HorizontalLineSpacer from "components/HorizontalLineSpacer"
import SortOrderWidget, { SortOrder } from "./SortOrder"
import { Project } from "softwiki-core/models/Project"
import { useData } from "Data"
import { useSelectedNote } from "./SelectedNote"

const NoteListLayout = styled.div`
	display: flex;
	flex-direction: column;

	//padding: 8px;

	background-color: ${({ theme }) => theme.notes.list.backgroundColor};
	
	border-left: 2px solid rgb(50, 50, 50);
	border-right: 2px solid rgb(45, 45, 45);
`

const Filters = styled.div`
	display: flex;
	flex-direction: row;
	padding: 8px;

	& > *
	{
		:not(:last-child)
		{
			margin-right: 4px;
		}
	}
`
const ActionBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 8px;
	padding-bottom: 0;
`

const AddButton = styled.button`
	background: none;
	color: ${({theme}) => theme.notes.list.cardColor};
	border: 2px solid ${({theme}) => theme.notes.list.cardColor};
	border-radius: 4px;

	font-weight: bold;

	cursor: pointer;

	&:hover
	{
		color: ${({theme}) => theme.notes.list.cardColorHover};
		border: 2px solid ${({theme}) => theme.notes.list.cardColorHover};
	}
`

const SearchInput = styled(Input)`
	flex: 1;
`

interface NoteListArguments {
	project: Project | undefined
	CreateNote: () => void
}

const Notes = styled.div`
	overflow-y: auto;
`

export default function NoteList(props: NoteListArguments) {

	const {notes, tags} = useData()
	const selectedNote = useSelectedNote()

	const [tpmSearchFilter, SetTpmSearchFilter] = useState<string>("")
	const [searchFilter, SetSearchFilter] = useState<string>("")
	const [filteredTags, SetFilteredTags] = useState<Tag[]>([])
	const [sortOrder, SetSortOrder] = useState<number>(SortOrder.Alphabetical)

	const displayedNotes: Note[] = notes.filter((note: Note) => {
		for (let i = 0; i < filteredTags.length; i++) {
			if (!note.HasTag(filteredTags[i]))
				return false
		}
		if (note.GetTitle().match(new RegExp(searchFilter, "i")) === null)
			return false

		if (props.project !== undefined && !note.HasProject(props.project))
			return false

		return true 
	})

	if (sortOrder === SortOrder.Alphabetical) {
		displayedNotes.sort((a: Note, b: Note) => a.GetTitle().toLowerCase() > b.GetTitle().toLowerCase() ? 1 : -1)
	}
	else if (sortOrder === SortOrder.AlphabeticalReverse) {
		displayedNotes.sort((a: Note, b: Note) => a.GetTitle().toLowerCase() < b.GetTitle().toLowerCase() ? 1 : -1)
	}
	else if (sortOrder === SortOrder.CreationDateReverse) {
		displayedNotes.reverse()
	}

	return (
		<NoteListLayout>
			<Filters>
				<SearchInput
					onChange={(e: ChangeEvent<HTMLInputElement>) => { SetTpmSearchFilter(e.target.value) }}
					onKeyPress={(e: React.KeyboardEvent) => {
						if (e.code === "Enter")
							SetSearchFilter(tpmSearchFilter)
					}}
					placeholder="Search..."
					value={tpmSearchFilter}
				/>
				<TagsFilter tags={tags} OnChange={(newFilters: Tag[]) => { SetFilteredTags(newFilters) }} />
				<SortOrderWidget sortOrder={sortOrder} OnChange={(newSortOrder: SortOrder) => { SetSortOrder(newSortOrder) }} />
			</Filters>
			<ActionBar>
				<div>Notes</div>
				<AddButton onClick={() => { props.CreateNote() }}> + </AddButton>
			</ActionBar>
			<HorizontalLineSpacer />
			
			<Notes>
				{
					displayedNotes.map((note: Note) => {
						return (
							<NoteCardPreview
								key={note.Id()}
								note={note}
								onClick={() => { selectedNote.SelectNote(note) }}
							/>
						)
					}
					)}
			</Notes>

		</NoteListLayout>
	)
}