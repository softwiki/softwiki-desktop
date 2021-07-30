import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ComboBox, ComboBoxItem } from "Components/ComboBox"

import * as themes from "Themes"
import Input from "Components/Input"
import Event from "SoftWiki-Core/Services/EventService"
import { ConfigContext } from "Config"

export enum AppearanceEvent
{
	FontChanged = "SettingsEvent.FontChanged",
	FontSizeChanged = "SettingsEvent.FontSizeChanged"
}

var themesName = Object.keys(themes)

const AppearanceSettingsLayout = styled.div`

`
export default function Appearance(props: {onSave: Function} & any)
{
	const {theme, SetTheme, font, SetFont} = useContext(ConfigContext)

	const [tmpFont, SetTmpFont] = useState(font.family)
	const [tmpFontSize, SetTmpFontSize] = useState(font.size)

	const fontRef = useRef(tmpFont)
	const fontSizeRef = useRef(tmpFontSize)

	fontRef.current = tmpFont
	fontSizeRef.current = tmpFontSize
	
	const HandleThemeChange = (e: ChangeEvent<HTMLSelectElement>) =>
	{
		let themeKey = e.target.value as keyof object
		SetTheme(themeKey)
	}

	const HandleFontChange = (e: ChangeEvent<HTMLInputElement>) =>
	{
		SetTmpFont(e.target.value)
		Event.Run(AppearanceEvent.FontChanged, {font: e.target.value})
	}

	const HandleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) =>
	{
		let fontSize: number = parseInt(e.target.value)
		SetTmpFontSize(fontSize)
		Event.Run(AppearanceEvent.FontSizeChanged, {fontSize})
	}

	useEffect(() => {
		return () => {
			SetFont({family: fontRef.current, size: fontSizeRef.current})
		}
	}, [SetFont])

	return (
		<AppearanceSettingsLayout>
			<Line>
				<LineTitle>Font</LineTitle>
				<Input value={tmpFont} onChange={HandleFontChange}/>
			</Line>
			<Line>
				<LineTitle>Font Size</LineTitle>
				<Input type="number" value={tmpFontSize} onChange={HandleFontSizeChange}/>
			</Line>
			<Line>
				<LineTitle>Theme</LineTitle>
				<ComboBox onChange={HandleThemeChange}>
					{
						themesName.map((themeName: string) => {
							return (
								<ComboBoxItem
									key={themeName}
									value={themeName}
									selected={themeName === theme.name}
								>
									{themeName}
								</ComboBoxItem>
							)
						})
					}
				</ComboBox>		
			</Line>
		</AppearanceSettingsLayout>
	)
}

const Line = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	:not(:last-child)
	{
		margin-bottom: 4px;
	}
`

const LineTitle = styled.p`
	margin: 0;
`