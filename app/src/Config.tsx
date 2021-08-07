import { writeFile, readFile, getDefaultBasePath } from "files"
import React, { useEffect } from "react"
import { useState } from "react"
import * as themes from "themes"

export enum ConfigEvent {
	SET = "ConfigEvent.Set"
}

class AppConfig
{
	private _cfg: any = {}

	public get<T>(key: string): T
	{
		return this._cfg[key]
	}

	public set(key: string, value: any): void
	{
		this._cfg[key] = value;
		this._save();
	}

	public async loadConfig(): Promise<void>
	{
		await this._load()
	}

	private async _save(): Promise<void>
	{
		await writeFile(getDefaultBasePath() + "/cfg.json", JSON.stringify(this._cfg, null, 4))
	}

	private async _load(): Promise<void>
	{
		try
		{
			const data = await readFile(getDefaultBasePath() + "/cfg.json")
			this._cfg = JSON.parse(data)
		}
		catch (e: any)
		{
			console.log(e)
		}
	}
}

const appConfig = new AppConfig()

interface Font
{
	family: string
	size: number
}

interface Theme
{
	name: string
	appearance: any
}

interface ConfigContextProps
{
	theme: Theme
	selectTheme: (name: string) => void,
	font: Font
	selectFont: (font: Font) => void
}

const defaultConfigContext = {
	theme: {name: themes.dark.name, appearance: themes.dark},
	selectTheme: () => {},
	font: {family: "Arial", size: 16},
	selectFont: () => {},
}

export const ConfigContext = React.createContext<ConfigContextProps>(defaultConfigContext)

interface ConfigProps
{
	children: JSX.Element | JSX.Element[]
}

export function Config({children}: ConfigProps)
{
	const [theme, setTheme] = useState<Theme>(defaultConfigContext.theme)
	const [font, setFont] = useState<Font>(defaultConfigContext.font)

	useEffect(() => 
	{
		appConfig.loadConfig().then(() => 
		{
			const themeName = appConfig.get("theme") as keyof unknown
			let theme: any = themes[themeName]
			if (!theme) theme = themes.dark
			let appearance = JSON.parse(JSON.stringify(theme));
			appearance = fillMissingThemeFields(appearance)
			setTheme({name: themeName, appearance: appearance})
			const fontFamily = appConfig.get("font") as string
			const fontSize = appConfig.get("fontSize") as number
			setFont({family: fontFamily, size: fontSize})	
		})
	}, [])

	return (
		<ConfigContext.Provider value={{
			theme,
			selectTheme: (nameAsString: string) => 
			{
				const name = nameAsString as keyof unknown
				let appearance = JSON.parse(JSON.stringify(themes[name]))
				appearance = fillMissingThemeFields(appearance)
		
				appConfig.set("theme", name)
				setTheme({name, appearance})
			},
			font,
			selectFont: (font: Font) =>
			{
				appConfig.set("font", font.family)
				appConfig.set("fontSize", font.size)
				setFont(font)
			}
		}}>
			{children}
		</ConfigContext.Provider>
	)
}

function fillMissingThemeFields(theme: any): any
{
	const defaultTheme = JSON.parse(JSON.stringify(themes.dark))
	Object.assign(defaultTheme, theme)
	return defaultTheme
}