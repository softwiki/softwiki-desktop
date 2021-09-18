import Modal from "app/ui/components/Modal";

interface ModalMessageProps
{
	content: JSX.Element | null
	onClickOutside?: () => void
}

export function ModalMessage({content, onClickOutside}: ModalMessageProps) {
	if (!content)
		return <></>	
	return (
		<Modal onClickOutside={() => { onClickOutside && onClickOutside(); }}>
			{content}
		</Modal>
	)
}