import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
//import { useData } from "Data";
import { ColorResult, SketchPicker } from "react-color";

export interface Color
{
	r: number
	g: number
	b: number
	a?: number | undefined
}

const TagEditorLayout = styled.div`
	display: flex;
	flex-direction: column;
	width: 256px;
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

interface TagEditorProps
{
	name: string
	color: Color
	onChange: (name: string, color: Color) => any
}

export default function TagEditor({name, color, onChange}: TagEditorProps)
{
	const [modifiedName, setModifiedName] = useState(name);
	const [modifiedColor, setModifiedColor] = useState(color);

	const onNameChange = (e: ChangeEvent<HTMLInputElement>) => { setModifiedName(e.target.value) }
	const onColorChange = (newColor: ColorResult) => { setModifiedColor(newColor.rgb) }

	return (
		<TagEditorLayout>
			<Name value={modifiedName} onChange={onNameChange}/>
			<SketchPicker color={modifiedColor} onChange={onColorChange} width={"auto"}/>
			<ButtonsBar>
				<CancelButton onClick={() =>  { onChange(name, color); }}>Cancel</CancelButton>
				<SaveButton onClick={() =>  { onChange(modifiedName, modifiedColor); }}>Save & Close</SaveButton>
			</ButtonsBar>
		</TagEditorLayout>
	)
}