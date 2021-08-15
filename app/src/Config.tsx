import { writeFile, readFile, getDefaultBasePath } from "files"
import React, { useEffect } from "react"
import { useState } from "react"
import * as themes from "themes"

export interface ConfigFields
{
	font: {
		family: string,
		size: number
	},
	theme: {
		name: string
	},
	provider: {
		type: string,
		config: Record<string, unknown>
	}
}

interface ConfigContextProps extends ConfigFields
{
	selectTheme: (name: string) => void,
	selectFont: (family: string, size: number) => void
}

const defaultConfig = {
	theme: {name: themes.dark.name, appearance: themes.dark},
	font: {family: "Arial", size: 16},
	provider: {type: "fs", config: {}},
	
	selectTheme: () => {},
	selectFont: () => {}
}

export const ConfigContext = React.createContext<ConfigContextProps>(defaultConfig)

interface ConfigProps
{
	children: JSX.Element | JSX.Element[]
}

export function Config({children}: ConfigProps)
{
	const [configLoaded, setConfigLoaded] = useState<boolean>(false);
	const [config, setConfig] = useState<ConfigFields>(defaultConfig);

	useEffect(() => 
	{
		readFile(getDefaultBasePath() + "/cfg.json").then((content: string) =>
		{
			const configJson = JSON.parse(content) as ConfigFields;
			setConfig({...defaultConfig, ...configJson});
			setConfigLoaded(true);
		})
	},
	[])

	const saveConfig = async (newConfig: ConfigFields) =>
	{
		await writeFile(getDefaultBasePath() + "/cfg.json", JSON.stringify(newConfig, null, 4))
	}
	
	return (
		<ConfigContext.Provider value={{...config,
			selectTheme: (name: string) => 
			{
				const newConfig = {...config, theme: {...config.theme, name}};
				setConfig(newConfig)
				saveConfig(newConfig);
			},
			selectFont: (family: string, size: number) =>
			{
				const newConfig = {...config, font: {family, size}};
				setConfig(newConfig)
				saveConfig(newConfig);
			}
		}}>
			{configLoaded ? children : <></>}
		</ConfigContext.Provider>
	)
}