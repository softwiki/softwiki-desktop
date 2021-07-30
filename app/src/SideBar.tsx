import styled from "styled-components"

import Modal from "Components/Modal"

import notesImage from "Images/notes.png"
import settingsImage from "Images/settings.png"
import helpImage from "Images/help.png"

import { useState } from "react"
import Settings from "Pages/Settings/Settings"
import Help from "Pages/Help"

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

export default function SideBar(props: any)
{
	const [showSettings, SetShowSettings] = useState<boolean>(false)
	const [showHelp, SetShowHelp] = useState<boolean>(false)

	return (
		<SideBarLayout>
			<Icon src={notesImage} title="Notes" alt="notes"/>
			<Icon src={helpImage}  title="Help" alt="help" style={{marginTop: "auto"}} onClick={() => {
				SetShowHelp(true)
			}}/>
			<Icon src={settingsImage} title="Settings" alt="settings" onClick={() => {
				SetShowSettings(true)
			}}/>
			{
				showSettings ?
					<Modal>
						<Settings Close={() => { SetShowSettings(false) }}/>
					</Modal>
				: ""
			}
			{
				showHelp ?
					<Modal OnClickOutside={() => { SetShowHelp(false) }}>
						<Help/>
					</Modal>
				: ""
			}
		</SideBarLayout>
	)
}