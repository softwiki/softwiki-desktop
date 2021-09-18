import styled from "styled-components"

import Modal from "app/ui/components/Modal"

import notesImage from "app/ui/images/notes.png"
import settingsImage from "app/ui/images/settings.png"
import helpImage from "app/ui/images/help.png"

import { useState } from "react"
import Settings from "app/ui/layout/Settings"
import Help from "app/ui/layout/Help"

const SideBarLayout = styled.div`
	display: flex;
	flex-direction: column;

	background-color: ${({theme}) => theme.sideBar.color};
`
const IconWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justfify-content: center;

	border-radius: 8px;
	margin: 4px;

	&:hover
	{
		background-color: ${({theme}) => theme.sideBar.colorHover};
	}

	cursor: pointer;
	transition-duration: 0.25s;
`

const Icon = styled.img`
	width: 32px;
	height: auto;
	padding: 8px;

	
	filter: invert(66%) sepia(98%) saturate(13%) hue-rotate(55deg) brightness(87%) contrast(87%);
`

export default function SideBar() {
	const [showSettings, setShowSettings] = useState<boolean>(false)
	const [showHelp, setShowHelp] = useState<boolean>(false)

	return (
		<SideBarLayout>
			<IconWrapper><Icon src={notesImage} title="Notes" alt="notes"/></IconWrapper>
			<IconWrapper style={{marginTop: "auto"}} ><Icon src={helpImage}  title="Help" alt="help" onClick={() => {
				setShowHelp(true)
			}}/></IconWrapper>
			<IconWrapper>
				<Icon src={settingsImage} title="Settings" alt="settings" onClick={() => {
					setShowSettings(true)
				}}/>
			</IconWrapper>
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