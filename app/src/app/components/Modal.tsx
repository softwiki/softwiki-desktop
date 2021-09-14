import { useEffect, useRef } from "react"
import styled from "styled-components"
import { handleWindowEvent } from "app/utils";

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

	background-color: ${({theme}) => theme.modal.color};;
	border-radius: 4px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
`

interface ModalProps
{
	onClickOutside?: () => void
	children?: JSX.Element
}

export default function Modal({onClickOutside, children}: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleMouseEvent = (e: any) => {
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				onClickOutside && onClickOutside()
			}
		}

		const mouseEvent = handleWindowEvent("mousedown", handleMouseEvent)
		return (() => {
			mouseEvent.delete()
		})
	}, [onClickOutside])

	return (
		<ModalLayout >
			<ModalContent ref={modalRef}>
				{children}
			</ModalContent>
		</ModalLayout>
	)
}