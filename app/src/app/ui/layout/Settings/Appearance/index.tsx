import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ComboBox, ComboBoxItem } from "app/ui/components/ComboBox"

import * as themes from "app/ui/themes"
import Input from "app/ui/components/Input"
import { ConfigContext } from "app/services/config"

const AppearanceSettingsLayout = styled.div`

`

export default function Appearance() {
	const {theme, selectTheme, font, selectFont} = useContext(ConfigContext)

	const [temporaryFont, setTemporaryFont] = useState(font.family)
	const [temporaryFontSize, setTemporaryFontSize] = useState(font.size)

	const fontRef = useRef(temporaryFont)
	const fontSizeRef = useRef(temporaryFontSize)
	const applyFont = useRef(selectFont)

	fontRef.current = temporaryFont
	fontSizeRef.current = temporaryFontSize
	applyFont.current = selectFont
	
	const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
		selectTheme(e.target.value)
	}

	const handleFontChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTemporaryFont(e.target.value)
	}

	const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fontSize: number = parseInt(e.target.value)
		setTemporaryFontSize(fontSize)
	}

	useEffect(() => {
		return () => {
			applyFont.current(fontRef.current, fontSizeRef.current)
		}
	}, [])

	const themesName = Object.keys(themes)

	return (
		<AppearanceSettingsLayout>
			<Line>
				<LineTitle>Font</LineTitle>
				<Input value={temporaryFont} onChange={handleFontChange}/>
			</Line>
			<Line>
				<LineTitle>Font Size</LineTitle>
				<Input style={{appearance: "textfield"}} type="number" value={temporaryFontSize} onChange={handleFontSizeChange}/>
			</Line>
			<Line>
				<LineTitle>Theme</LineTitle>
				<ComboBox onChange={handleThemeChange}>
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