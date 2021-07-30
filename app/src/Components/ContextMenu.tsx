import { HandleWindowEvent } from "SoftWiki-Core";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Popup from "./Popup";

const ContextMenuLayout = styled.div`
	
`

const ContextMenuItems = styled.div`

	display: flex;
	flex-direction: column;

	border-radius: 4px;

	background-color: ${({theme}) => theme.dropdown.backgroundColor};	
	color: ${({theme}) => theme.comboBox.textColor};
`

interface ContextMenuProps
{
	children:JSX.Element | JSX.Element[]
	trigger?: any
	useLeftClick?: boolean
	absolutePosition?: any 
}

export function ContextMenu({children, trigger, useLeftClick = false, absolutePosition}: ContextMenuProps)
{
	const [show, SetShow] = useState(false)
	const [position, SetPosition] = useState({x: 0, y: 0})

	const contextMenuRef = useRef<HTMLDivElement>(null)

	

	useEffect(() => {
		if (!trigger)
			return
		const HandleMouseEvent = (e: any) => {
			if (e.type === "contextmenu" && trigger.current.contains(e.target))
			{
				SetPosition({x: e.clientX + 1, y: e.clientY + 1})
				SetShow(true)
			}

			if (useLeftClick && e.type === "mousedown" && !show && trigger.current.contains(e.target))
			{
				SetPosition({x: e.clientX + 1, y: e.clientY + 1})
				SetShow(true)
			}

			if (e.type === "mousedown" && show && contextMenuRef.current && !contextMenuRef.current.contains(e.target))
			{
				SetShow(false)
			}
		}
		let contextMenuEvent = HandleWindowEvent("contextmenu", HandleMouseEvent)
		let clickOutsideEvent = HandleWindowEvent("mousedown", HandleMouseEvent)
		return (() => {
			contextMenuEvent.Delete()
			clickOutsideEvent.Delete()
		})
	}, [trigger, show, useLeftClick])

	return (
		<ContextMenuLayout ref={contextMenuRef}>
			<Popup position={absolutePosition ? absolutePosition : {left: `${position.x}px`, top: `${position.y}px`}} show={show} hideDefaultBackground>
				<ContextMenuItems onClick={() => { SetShow(false) }}>
					{children}
				</ContextMenuItems>
			</Popup>
		</ContextMenuLayout>
	)
}

export const ContextMenuItemLayout = styled.div`

	padding: 4px;

	&:hover
	{
		background-color: ${({theme}) => theme.dropdown.backgroundColorHover};	
	}
`

interface ContextMenuItemProps { 
	action?: () => void
	value: string
	textColor?: string
}

export function ContextMenuItem({action, value, textColor}: ContextMenuItemProps)
{
	let style: React.CSSProperties = {}
	if (textColor)
		style.color = textColor
	return (
		<ContextMenuItemLayout
			style={style}
			onClick={() => { action && action() }}
		>
			{value}
		</ContextMenuItemLayout>
	)
}

interface ContextMenuValueProps { 
	
}

export const ContextMenuValue = styled.div<ContextMenuValueProps>`
`

interface ContextMenuSpacerProps { 
	
}

export const ContextMenuSpacer = styled.div<ContextMenuSpacerProps>`
	border-top: 1px solid ${({theme}) => theme.settings.spacerColor};
	margin: 0;
`