import { writeFile, readFile } from "softwiki-core"
import Event from "softwiki-core/services/EventService"
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
		this._cfg[key] = value
		this._save()
		Event.run(ConfigEvent.SET, {key, value})
	}

	public async loadConfig(): Promise<void>
	{
		await this._load()
	}

	private async _save(): Promise<void>
	{
		await writeFile("cfg.json", JSON.stringify(this._cfg, null, 4))
	}

	private async _load(): Promise<void>
	{
		const data = await readFile("cfg.json")
		this._cfg = JSON.parse(data)
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
	theme: {name: "Dark", appearance: themes["Dark"]},
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
			const theme = themes[themeName]
			setTheme({name: themeName, appearance: theme})
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
				const appearance = JSON.parse(JSON.stringify(themes["Dark"]))
				Object.assign(appearance, themes[name])
		
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
