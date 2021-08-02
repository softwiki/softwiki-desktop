import { Color } from "softwiki-core/models"
import React, {  useEffect, useState } from "react"
import styled from "styled-components"

import {SketchPicker, ColorResult} from "react-color"
import Input from "components/Input"
import Popup from "components/Popup"

interface TagEditorProps
{
	initialName: string
	initialColor: Color
	editDefault?: boolean
	OnChange?: (name: string, color: Color) => void
	OnNameChange?: (name: string, color: Color) => void
	OnColorChange?: (color: Color) => void
	OnDelete?: () => void
}

export default function TagEditor({initialName, initialColor, editDefault = false, OnChange, OnNameChange, OnColorChange, OnDelete}: TagEditorProps)
{
	const [tmpName, SetTmpName] = useState(initialName)
	const [tmpColor, SetTmpColor] = useState<Color>(initialColor)
	const [editMode, SetEditMode] = useState(editDefault)
	const [editColorMode, SetEditColorMode] = useState(false)

	const colorAsCss = `rgba(${tmpColor.r}, ${tmpColor.g}, ${tmpColor.b}, ${tmpColor.a})`

	useEffect(() => {
		SetTmpColor(initialColor)
	}, [initialColor])

	const OnTmpNameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
	{
		SetTmpName(e.target.value)
	}

	const OnColorChanged = (colorResult: ColorResult) =>
	{
		SetTmpColor(colorResult.rgb)
	}

	const OnEnter = () => {
		SetEditMode(false)
		OnNameChange && OnNameChange(tmpName, tmpColor)
		OnChange && OnChange(tmpName, tmpColor)
	}

	return (
		<div>
			<CardField>
				<ColoredCircle
					style={{backgroundColor: colorAsCss}}
					onClick={() => {
						if (!editColorMode)
							SetEditColorMode(true)
					}}
				>
					<Popup
						show={editColorMode}
						hideDefaultBackground
						OnClickOutside={() => {
							setTimeout(() =>{
								if (editColorMode)
								{
									OnColorChange && OnColorChange(tmpColor)
									OnChange && OnChange(tmpName, tmpColor)
								}
								SetEditColorMode(false)
							})
						}}
					>
						<SketchPicker onChangeComplete={OnColorChanged} color={tmpColor}/>
					</Popup>
				</ColoredCircle>
				{
					editMode ?
						<Input
							type="text"
							value={tmpName}
							style={{marginRight: "8px"}}
							onChange={OnTmpNameChanged}
							onKeyPress={(e: React.KeyboardEvent) => {
								if (e.code === "Enter")
									OnEnter()
							}}/>
						: 
						<TagName onClick={() => {SetEditMode(true)}}>{initialName}</TagName>
				}
				{
					OnDelete ? 
						<DeleteButton onClick={() => {
							SetEditMode(false)
							OnDelete && OnDelete()
						}}>Delete</DeleteButton>
						: ""
				}
			</CardField>
		</div>
	)
}

const ColoredCircle = styled.div`
	border-radius: 128px;
	width: 16px;
	height: 16px;
	margin-right: 4px;

	position: relative;
	cursor: pointer;
`

const CardField = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	//margin-bottom: 8px;
	padding: 4px;
	border-radius: 16px;

	&:hover
	{
		background-color: rgba(0, 0, 0, 0.10);
	}
`

const DeleteButton = styled.button`
	margin-left: auto;

	border: none;
	background-color: rgb(150, 0, 0);
	color: white;
	padding: 4px;
	border-radius: 16px;

	font-size: 0.75rem;
	cursor: pointer;
	opacity: 0;

	*:hover > &
	{
		opacity: 1;
	}
`

const TagName = styled.span`
	margin-right: 16px;
	cursor: pointer;
`