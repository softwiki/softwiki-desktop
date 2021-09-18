import { writeFile, readFile, getDefaultBasePath } from "app/utils/files"
import React, { useEffect } from "react"
import { useState } from "react"
import { ConfigFields, defaultConfig, ConfigContext } from "./context";

interface ConfigProps
{
	children: JSX.Element | JSX.Element[]
}

export function ConfigService({children}: ConfigProps) {
	const [configLoaded, setConfigLoaded] = useState<boolean>(false);
	const [config, setConfig] = useState<ConfigFields>(defaultConfig);

	useEffect(() => {
		readFile(getDefaultBasePath() + "/cfg.json").then((content: string) => {
			const configJson = JSON.parse(content) as ConfigFields;
			setConfig({...defaultConfig, ...configJson});
			setConfigLoaded(true);
		}).catch(() => {
			setConfig({...defaultConfig});
			setConfigLoaded(true);
		})
	},
	[])

	const saveConfig = async (newConfig: ConfigFields) => {
		await writeFile(getDefaultBasePath() + "/cfg.json", JSON.stringify(newConfig, null, 4))
	}
	
	return (
		<ConfigContext.Provider value={{...config,
			selectTheme: (name: string) => {
				const newConfig = {...config, theme: {...config.theme, name}};
				setConfig(newConfig)
				saveConfig(newConfig);
			},
			selectFont: (family: string, size: number) => {
				const newConfig = {...config, font: {family, size}};
				setConfig(newConfig)
				saveConfig(newConfig);
			}
		}}>
			{configLoaded ? children : <></>}
		</ConfigContext.Provider>
	)
}