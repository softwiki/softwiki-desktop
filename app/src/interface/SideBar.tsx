import styled from "styled-components"

import Modal from "components/Modal"

import notesImage from "images/notes.png"
import settingsImage from "images/settings.png"
import helpImage from "images/help.png"

import { useState } from "react"
import Settings from "interface/Settings/Settings"
import Help from "interface/Help"

const SideBarLayout = styled.div`
	display: flex;
	flex-direction: column;

	background-color: ${({theme}) => theme.sideBar.backgroundColor};
`

const Icon = styled.img`
	width: 32px;
	height: auto;
	padding: 8px;

	cursor: pointer;
	filter: invert(66%) sepia(98%) saturate(13%) hue-rotate(55deg) brightness(87%) contrast(87%);

	transition-duration: 0.25s;

	:hover
	{
		background-color: ${({theme}) => theme.sideBar.iconBackgroundColorHover};
	}
`

export default function SideBar()
{
	const [showSettings, setShowSettings] = useState<boolean>(false)
	const [showHelp, setShowHelp] = useState<boolean>(false)

	return (
		<SideBarLayout>
			<Icon src={notesImage} title="Notes" alt="notes"/>
			<Icon src={helpImage}  title="Help" alt="help" style={{marginTop: "auto"}} onClick={() => 
			{
				setShowHelp(true)
			}}/>
			<Icon src={settingsImage} title="Settings" alt="settings" onClick={() => 
			{
				setShowSettings(true)
			}}/>
			{
				showSettings ?
					<Modal>
						<Settings close={() => { setShowSettings(false) }}/>
					</Modal>
					: ""
			}
			{
				showHelp ?
					<Modal onClickOutside={() => { setShowHelp(false) }}>
						<Help/>
					</Modal>
					: ""
			}
		</SideBarLayout>
	)
}