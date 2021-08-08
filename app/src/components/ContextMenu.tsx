import { handleWindowEvent } from "utils";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Popup from "./Popup";

const ContextMenuLayout = styled.div`
	
`

const ContextMenuItems = styled.div`

	display: flex;
	flex-direction: column;

	border-radius: 4px;

	background-color: ${({theme}) => theme.contextMenu.color};	
	color: ${({theme}) => theme.contextMenu.textColor};
`

interface ContextMenuProps
{
	children: JSX.Element | JSX.Element[]
	trigger?: any
	useLeftClick?: boolean
	absolutePosition?: any 
}

export function ContextMenu({children, trigger, useLeftClick = false, absolutePosition}: ContextMenuProps)
{
	const [show, setShow] = useState(false);
	const [position, setPosition] = useState({x: 0, y: 0});

	const contextMenuRef = useRef<HTMLDivElement>(null);

	useEffect(() => 
	{
		if (!trigger)
			return
		const handleMouseEvent = (e: any) => 
		{
			if (e.type === "contextmenu" && trigger.current.contains(e.target))
			{
				setPosition({x: e.clientX + 1, y: e.clientY + 1})
				setShow(true)
			}

			if (useLeftClick && e.type === "mousedown" && !show && trigger.current.contains(e.target))
			{
				setPosition({x: e.clientX + 1, y: e.clientY + 1})
				setShow(true)
			}

			if (e.type === "mousedown" && show && contextMenuRef.current && !contextMenuRef.current.contains(e.target))
			{
				setShow(false)
			}
		}
		const contextMenuEvent = handleWindowEvent("contextmenu", handleMouseEvent)
		const clickOutsideEvent = handleWindowEvent("mousedown", handleMouseEvent)
		return (() => 
		{
			contextMenuEvent.delete()
			clickOutsideEvent.delete()
		})
	}, [trigger, show, useLeftClick])

	return (
		<ContextMenuLayout ref={contextMenuRef}>
			<Popup position={absolutePosition ? absolutePosition : {left: `${position.x}px`, top: `${position.y}px`}}
				show={show}
				hideDefaultBackground
			>
				<ContextMenuItems onClick={() => { setShow(false) }}>
					{children}
				</ContextMenuItems>
			</Popup>
		</ContextMenuLayout>
	)
}

export const ContextMenuItemLayout = styled.div`
	padding: 4px;
	transition-duration: 0.10s;

	&:hover
	{
		background-color: ${({theme}) => theme.contextMenu.colorHover};	
	}
`

interface ContextMenuItemProps { 
	action?: () => void
	value: string
	textColor?: string
}

export function ContextMenuItem({action, value, textColor}: ContextMenuItemProps)
{
	const style: React.CSSProperties = {}
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

export const ContextMenuValue = styled.div`
`

export const ContextMenuSpacer = styled.div`
	border-top: 1px solid ${({theme}) => theme.modal.spacerColor};
	margin: 0;
`