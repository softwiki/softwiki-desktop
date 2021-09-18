import React from "react";
import * as themes from "app/ui/themes"

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

export interface ConfigContextProps extends ConfigFields
{
	selectTheme: (name: string) => void,
	selectFont: (family: string, size: number) => void
}

export const defaultConfig = {
	theme: {name: themes.dark.name, appearance: themes.dark},
	font: {family: "Arial", size: 16},
	provider: {type: "fs", config: {}},
	
	selectTheme: () => {},
	selectFont: () => {}
}

export const ConfigContext = React.createContext<ConfigContextProps>(defaultConfig)