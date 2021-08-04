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
	onChange?: (name: string, color: Color) => void
	onNameChange?: (name: string, color: Color) => void
	onColorChange?: (color: Color) => void
	onDelete?: () => void
}

export default function TagEditor({initialName, initialColor, editDefault = false, onChange, onNameChange, onColorChange, onDelete}: TagEditorProps)
{
	const [tmpName, setTmpName] = useState(initialName)
	const [tmpColor, setTmpColor] = useState<Color>(initialColor)
	const [editMode, setEditMode] = useState(editDefault)
	const [editColorMode, setEditColorMode] = useState(false)

	const colorAsCss = `rgba(${tmpColor.r}, ${tmpColor.g}, ${tmpColor.b}, ${tmpColor.a})`

	useEffect(() => 
	{
		setTmpColor(initialColor)
	}, [initialColor])

	const onTmpNameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
	{
		setTmpName(e.target.value)
	}

	const onColorChanged = (colorResult: ColorResult) =>
	{
		setTmpColor(colorResult.rgb)
	}

	const onEnter = () => 
	{
		setEditMode(false)
		onNameChange && onNameChange(tmpName, tmpColor)
		onChange && onChange(tmpName, tmpColor)
	}

	return (
		<div>
			<CardField>
				<ColoredCircle
					style={{backgroundColor: colorAsCss}}
					onClick={() => 
					{
						if (!editColorMode)
							setEditColorMode(true)
					}}
				>
					<Popup
						show={editColorMode}
						hideDefaultBackground
						onClickOutside={() => 
						{
							setTimeout(() =>
							{
								if (editColorMode)
								{
									onColorChange && onColorChange(tmpColor)
									onChange && onChange(tmpName, tmpColor)
								}
								setEditColorMode(false)
							})
						}}
					>
						<SketchPicker onChangeComplete={onColorChanged} color={tmpColor}/>
					</Popup>
				</ColoredCircle>
				{
					editMode ?
						<Input
							type="text"
							value={tmpName}
							style={{marginRight: "8px"}}
							onChange={onTmpNameChanged}
							onKeyPress={(e: React.KeyboardEvent) => 
							{
								if (e.code === "Enter")
									onEnter()
							}}/>
						: 
						<TagName onClick={() => {setEditMode(true)}}>{initialName}</TagName>
				}
				{
					onDelete ? 
						<DeleteButton onClick={() => 
						{
							setEditMode(false)
							onDelete && onDelete()
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