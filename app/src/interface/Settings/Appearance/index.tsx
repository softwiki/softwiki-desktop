import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ComboBox, ComboBoxItem } from "components/ComboBox"

import * as themes from "themes"
import Input from "components/Input"
import Event from "softwiki-core/services/EventService"
import { ConfigContext } from "Config"

export enum AppearanceEvent
{
	FontChanged = "SettingsEvent.FontChanged",
	FontSizeChanged = "SettingsEvent.FontSizeChanged"
}

const themesName = Object.keys(themes)

const AppearanceSettingsLayout = styled.div`

`
export default function Appearance()
{
	const {theme, selectTheme, font, selectFont} = useContext(ConfigContext)

	const [temporaryFont, setTemporaryFont] = useState(font.family)
	const [temporaryFontSize, setTemporaryFontSize] = useState(font.size)

	const fontRef = useRef(temporaryFont)
	const fontSizeRef = useRef(temporaryFontSize)

	fontRef.current = temporaryFont
	fontSizeRef.current = temporaryFontSize
	
	const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) =>
	{
		selectTheme(e.target.value)
	}

	const handleFontChange = (e: ChangeEvent<HTMLInputElement>) =>
	{
		setTemporaryFont(e.target.value)
		Event.run(AppearanceEvent.FontChanged, {font: e.target.value})
	}

	const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) =>
	{
		const fontSize: number = parseInt(e.target.value)
		setTemporaryFontSize(fontSize)
		Event.run(AppearanceEvent.FontSizeChanged, {fontSize})
	}

	useEffect(() => 
	{
		return () => 
		{
			selectFont({family: fontRef.current, size: fontSizeRef.current})
		}
	}, [])

	return (
		<AppearanceSettingsLayout>
			<Line>
				<LineTitle>Font</LineTitle>
				<Input value={temporaryFont} onChange={handleFontChange}/>
			</Line>
			<Line>
				<LineTitle>Font Size</LineTitle>
				<Input type="number" value={temporaryFontSize} onChange={handleFontSizeChange}/>
			</Line>
			<Line>
				<LineTitle>Theme</LineTitle>
				<ComboBox onChange={handleThemeChange}>
					{
						themesName.map((themeName: string) => 
						{
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