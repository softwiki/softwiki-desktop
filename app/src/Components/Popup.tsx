import { HandleWindowEvent } from "SoftWiki-Core"
import { useEffect, useRef } from "react"
import styled from "styled-components"

interface PopupWrapperProps
{
	hideBackground?: boolean
	position: any
}

const PopupWrapper = styled.div<PopupWrapperProps>`
	position: absolute;
	left: ${({position}) => position.left};
	top: ${({position}) => position.top};
	right: ${({position}) => position.right};
	bottom: ${({position}) => position.bottom};

	padding: 8px;

	display: flex;
	flex-direction: column;

	border: 1px solid rgb(60, 60, 60);
	border-radius: 4px;
	background-color: ${({theme}) => theme.notes.content.backgroundColor};
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
	color: white;
	cursor: pointer;
	z-index: 99;

	${({hideBackground}) => hideBackground ? `
		border: none;
		background: none;
		padding: 0;
	` : ""}
`

interface PopupProps
{
	show: boolean
	children: JSX.Element | JSX.Element[]
	OnClickOutside?: Function
	hideDefaultBackground?: boolean
	position?: object
}

export default function Popup({show, children, hideDefaultBackground = false, OnClickOutside, position}: PopupProps)
{
	if (position === undefined)
	{
		position = {top: "125%", left: "0"}
	}
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const HandleMouseEvent = (e: any) => {
			if (modalRef.current && !modalRef.current.contains(e.target))
			{
				OnClickOutside && OnClickOutside()
			}
		}

		let mouseEvent = HandleWindowEvent("mouseup", HandleMouseEvent)
		return (() => {
			mouseEvent.Delete()
		})
	}, [OnClickOutside])
	
	if (!show)
		return <div></div>
	return ( 
		<PopupWrapper position={position} ref={modalRef} hideBackground={hideDefaultBackground}>
			{children}
		</PopupWrapper>
	)
}