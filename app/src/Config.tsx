import { WriteFile, ReadFile } from "SoftWiki-Core"
import Event from "SoftWiki-Core/Services/EventService"
import React, { useEffect } from "react"
import { useState } from "react"
import * as themes from "Themes"

export enum ConfigEvent {
	SET = "ConfigEvent.Set"
}

class AppConfig
{
	private cfg: any = {}

	public SelectTheme: Function

	constructor()
	{
		this.SelectTheme = () => {}
	}

	public Get<T>(key: string) : T
	{
		return this.cfg[key]
	}

	public Set(key: string, value: any) : void
	{
		this.cfg[key] = value
		this.Save()
		Event.Run(ConfigEvent.SET, {key, value})
	}

	public async LoadConfig() : Promise<void>
	{
		await this.Load()
	}

	private async Save() : Promise<void>
	{
		await WriteFile("cfg.json", JSON.stringify(this.cfg, null, 4))
	}

	private async Load() : Promise<void>
	{
		let data = await ReadFile("cfg.json")
		this.cfg = JSON.parse(data)
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
	SetTheme: Function,
	font: Font
	SetFont: Function
}

const defaultConfigContext = {
	theme: {name: "Dark", appearance: themes["Dark"]},
	SetTheme: () => {},
	font: {family: "Arial", size: 16},
	SetFont: () => {},
}

export const ConfigContext = React.createContext<ConfigContextProps>(defaultConfigContext)

interface ConfigProps
{
	children: JSX.Element | JSX.Element[]
}

export function Config({children}: ConfigProps)
{
	const [theme, _SetTheme] = useState<Theme>(defaultConfigContext.theme)
	const [font, _SetFont] = useState<Font>(defaultConfigContext.font)

	const SetTheme = (name_: string) => {
		let name = name_ as keyof object
		let appearance = JSON.parse(JSON.stringify(themes["Dark"]))
		Object.assign(appearance, themes[name])

		appConfig.Set("theme", name)
		_SetTheme({name, appearance})
	}

	const SetFont = (font: Font) =>
	{
		appConfig.Set("font", font.family)
		appConfig.Set("fontSize", font.size)
		_SetFont(font)
	}

	useEffect(() => {
		appConfig.LoadConfig().then(() => {
			let themeName = appConfig.Get("theme") as keyof object
			let theme = themes[themeName]
			_SetTheme({name: themeName, appearance: theme})
			let fontFamily = appConfig.Get("font") as string
			let fontSize = appConfig.Get("fontSize") as number
			_SetFont({family: fontFamily, size: fontSize})	
		})
	}, [])

	return (
		<ConfigContext.Provider value={{
			theme,
			SetTheme,
			font,
			SetFont
		}}>
			{children}
		</ConfigContext.Provider>
	)
}
