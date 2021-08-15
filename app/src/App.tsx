import { useContext } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { Helmet } from "react-helmet"

import SideBar from "./interface/SideBar"
import NotesModule from "./interface/Notes"

import { Data } from "Data";
import { ConfigContext } from "Config";
import { Notifications } from "notifications";
import SideMenu from "interface/SideMenu";
import { GlobalState } from "GlobalState";
import * as themes from "./themes"

interface GlobalStyleProps {
	font: string
	fontSize: number
}

const GloabalStyle = createGlobalStyle<GlobalStyleProps>`
	html
	{
		font-family: ${(props) => props.font};
		font-size: ${(props) => props.fontSize}px;
	}

	textarea
	{
		font-size: ${(props) => props.fontSize}px;
		font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
	}

	body
	{
		margin: 0;
		height: 100vh;

		background-color: grey;
		color: white;
	}

	*:focus
	{
		outline: none;
	}

	*::-webkit-scrollbar {
		width: 6px;
	}
		
	*::-webkit-scrollbar-thumb
	{
		border-radius: 10px;
		background-color: rgba(0,0,0,0.25); 
	}

	a
	{
		color: cyan;
		text-decoration: none;
	}
`

const AppLayout = styled.div`
  display: flex;
  flex-direction: row;
  
  height: 100vh;
`

function App() 
{
	const { theme, font } = useContext(ConfigContext)
	const appearance = {...themes.dark, ...themes[theme.name as keyof typeof themes]}

	return (
		<AppLayout>
			<Helmet>
				<title>{process.env.REACT_APP_NAME} [{process.env.REACT_APP_VERSION}]</title>
			</Helmet>
			<ThemeProvider theme={appearance}>
				<Data>
					<GlobalState>
						<Notifications>
							<SideBar/>
							<SideMenu/>
							<NotesModule/>
						</Notifications>
					</GlobalState>
				</Data>
				<GloabalStyle font={font.family} fontSize={font.size} />
			</ThemeProvider>
		</AppLayout>
	);
}

export default App;
