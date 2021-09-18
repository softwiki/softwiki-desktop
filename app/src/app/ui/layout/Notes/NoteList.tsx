import styled from "styled-components"
import { Note } from "libs/softwiki-core/src/structures"
import NoteCardPreview from "./NoteCardPreview"
import Input from "app/ui/components/Input"
import { ChangeEvent, useState } from "react"
import HorizontalLineSpacer from "app/ui/components/HorizontalLineSpacer"
import SortOrderWidget, { SortOrder } from "./SortOrder"
import { useData } from "app/services/data"
import { useSelectedNote } from "./SelectedNote"
import { useGlobalState } from "app/GlobalState";
import AddButton from "app/ui/components/AddButton";

const NoteListLayout = styled.div`
	display: flex;
	flex-direction: column;

	//padding: 8px;

	background-color: ${({ theme }) => theme.notes.list.color};
	
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
const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 8px;
	padding-bottom: 0;
`

const SearchInput = styled(Input)`
	flex: 1;
`

interface NoteListArguments {
	createNote: () => void
}

const Notes = styled.div`
	overflow-y: auto;
`

export default function NoteList(props: NoteListArguments) {
	const {notes} = useData()
	const selectedNote = useSelectedNote()
	const {selectedCategory, tagFilters} = useGlobalState()

	const [tpmSearchFilter, setTpmSearchFilter] = useState<string>("")
	const [searchFilter, setSearchFilter] = useState<string>("")
	const [sortOrder, setSortOrder] = useState<number>(SortOrder.Alphabetical)

	const displayedNotes: Note[] = notes.filter((note: Note) => {
		for (let i = 0; i < tagFilters.length; i++) {
			if (!note.hasTag(tagFilters[i]))
				return false
		}
		if (note.getTitle().match(new RegExp(searchFilter, "i")) === null)
			return false

		if (selectedCategory !== null && !note.belongToCategory(selectedCategory))
			return false

		if (selectedCategory === null && note.getCategory())
			return false

		return true 
	})

	if (sortOrder === SortOrder.Alphabetical) {
		displayedNotes.sort((a: Note, b: Note) => a.getTitle().toLowerCase() > b.getTitle().toLowerCase() ? 1 : -1)
	}
	else if (sortOrder === SortOrder.AlphabeticalReverse) {
		displayedNotes.sort((a: Note, b: Note) => a.getTitle().toLowerCase() < b.getTitle().toLowerCase() ? 1 : -1)
	}
	else if (sortOrder === SortOrder.CreationDateReverse) {
		displayedNotes.reverse()
	}

	return (
		<NoteListLayout>
			<Filters>
				<SearchInput
					onChange={(e: ChangeEvent<HTMLInputElement>) => { setTpmSearchFilter(e.target.value) }}
					onKeyPress={(e: React.KeyboardEvent) => {
						if (e.code === "Enter")
							setSearchFilter(tpmSearchFilter)
					}}
					placeholder="Search..."
					value={tpmSearchFilter}
				/>
				<SortOrderWidget sortOrder={sortOrder} onChange={(newSortOrder: SortOrder) => { setSortOrder(newSortOrder) }} />
			</Filters>
			<Buttons>
				<div>Notes</div>
				<AddButton onClick={() => { props.createNote() }}/>
			</Buttons>
			<HorizontalLineSpacer marginBottom="0"/>	
			<Notes>
				{
					displayedNotes.map((note: Note) => {
						return (
							<NoteCardPreview
								key={note.getId()}
								note={note}
								onClick={() => { selectedNote.selectNote(note) }}
							/>
						)
					}
					)}
			</Notes>

		</NoteListLayout>
	)
}