import { useContext } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { Helmet } from "react-helmet"

import SideBar from "./SideBar"
import NotesModule from "./Pages/Notes"

import { AppUtils } from "AppUtils"
import { Data } from 'Data';
import { ConfigContext } from 'Config';

interface GlobalStyleProps {
	font: string
	fontSize: number
}

const GloabalStyle = createGlobalStyle<GlobalStyleProps>`
  html {
    font-family: ${(props) => props.font};
    font-size: ${(props) => props.fontSize}px;
  }

  body {
    margin: 0;
    height: 100vh;

    background-color: grey;
    color: white;
  }

  *:focus {
    outline: none;
  }

  *::-webkit-scrollbar {
		width: 6px;
	}
	 
	*::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: rgba(0,0,0,0.25); 
	}

  a {
    color: cyan;
    text-decoration: none;
  }
`

const AppLayout = styled.div`
  display: flex;
  flex-direction: row;
  
  height: 100vh;
`

function App() {
	const { theme, font } = useContext(ConfigContext)

	return (
		<AppLayout>
			<Helmet>
				<title>{process.env.REACT_APP_NAME} [{process.env.REACT_APP_VERSION}]</title>
			</Helmet>
			<ThemeProvider theme={theme.appearance}>
				<Data>
					<SideBar/>
					<NotesModule/>
				</Data>
				<GloabalStyle font={font.family} fontSize={font.size} />
				<AppUtils />
			</ThemeProvider>
		</AppLayout>
	);
}

export default App;
