import { HandleWindowEvent } from "utils"
import { useEffect, useRef } from "react"
import styled from "styled-components"

const ModalLayout = styled.div`

	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 99;

	background-color: rgba(0, 0, 0, 0.5);
`

const ModalContent = styled.div`

	padding: 8px;

	background-color: rgb(100, 100, 100);
	border-radius: 4px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
`

interface ModalProps
{
	OnClickOutside?: () => void
	children?: JSX.Element
}

export default function Modal({OnClickOutside, children}: ModalProps)
{
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const HandleMouseEvent = (e: any) => {
			if (modalRef.current && !modalRef.current.contains(e.target))
			{
				OnClickOutside && OnClickOutside()
			}
		}

		const mouseEvent = HandleWindowEvent("mousedown", HandleMouseEvent)
		return (() => {
			mouseEvent.Delete()
		})
	}, [OnClickOutside])

	

	return (
		<ModalLayout >
			<ModalContent ref={modalRef}>
				{children}
			</ModalContent>
		</ModalLayout>
	)
}