import { useContext } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { Helmet } from "react-helmet"

import SideBar from "./interface/SideBar"
import NotesModule from "./interface/Notes"

import { Data } from "app/Data";
import { ConfigContext } from "app/Config";
import { Messages } from "app/messages";
import SideMenu from "app/interface/SideMenu";
import { GlobalState } from "app/GlobalState";
import * as themes from "./themes"
import { handleWindowEvent } from "app/utils";
import React from "react";

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

const ColorPickerCssOverride = createGlobalStyle`
	.sketch-picker
	{
		background: none !important;
		box-shadow: none !important;
		color: white !important;
	}

	.flexbox-fix *
	{
		color: white !important;
	}

	.flexbox-fix input
	{
		border: none !important;
		box-shadow: none !important;
		background-color: ${({theme}) => (theme as any).input ? (theme as any).input.color : "none"};
	}
`

const AppLayout = styled.div`
  display: flex;
  flex-direction: row;
  
  height: 100vh;
`

function App() {
	const { theme, font } = useContext(ConfigContext)
	const appearance = {...themes.dark, ...themes[theme.name as keyof typeof themes]}
	
	handleWindowEvent("contextmenu", (e: any) => { e.preventDefault(); })

	return (
		<AppLayout>
			<Helmet>
				<title>{process.env.REACT_APP_NAME} [{process.env.REACT_APP_VERSION}]</title>
			</Helmet>
			<ThemeProvider theme={appearance}>
				<Messages>
					<Data>
						<GlobalState>
							<SideBar/>
							<SideMenu/>
							<NotesModule/>
						</GlobalState>
					</Data>
					<GloabalStyle font={font.family} fontSize={font.size} />
					<ColorPickerCssOverride/>
				</Messages>
			</ThemeProvider>
		</AppLayout>
	);
}

/*class ErrorBoundary extends React.Component
{
	constructor(props: any)
	{
		super(props);
		this.state = { hasError: false };
	}
  
	static getDerivedStateFromError(error: any) { return { hasError: true };  }
	componentDidCatch(error: any, errorInfo: any) { console.log("CATCH")  }
	render() 
	{
		if (this.state.hasError) { return <h1>Something went wrong.</h1>;    }
		return this.props.children;
	}
}*/

export default App;
