import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";

const CategoryEditorLayout = styled.div`

`

export const Name = styled(Input)`
	margin: 0 0 8px 0; 
`

export const ButtonsBar = styled.div`
	margin-top: 8px;

	display: flex;
	flex-direction: row;

	& > *:last-child
	{
		flex: 1;
		margin-left: 4px;
	}
`

export const SaveButton = styled(Button)`
	background-color: ${({theme}) => theme.greenButton.color};

	&:hover
	{
		background-color: ${({theme}) => theme.greenButton.colorHover};
	}
`

export const CancelButton = styled(Button)``

interface CategoryEditorProps
{
	name: string
	onChange: (name: string) => any
}

export default function CategoryEditor({name, onChange}: CategoryEditorProps)
{
	const [modifiedName, setModifiedName] = useState(name);

	return (
		<CategoryEditorLayout>
			<Name value={modifiedName} onChange={(e: ChangeEvent<HTMLInputElement>) => { setModifiedName(e.target.value) }}></Name>
			<ButtonsBar>
				<CancelButton onClick={() =>  { onChange(name); }}>Cancel</CancelButton>
				<SaveButton onClick={() =>  { onChange(modifiedName); }}>Save & Close</SaveButton>
			</ButtonsBar>
		</CategoryEditorLayout>
	)
}