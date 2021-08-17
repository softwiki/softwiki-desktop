import Modal from "components/Modal";
import { useNotification } from "notifications";

interface ModalNotificationProps
{
	content: JSX.Element | null
	onClickOutside?: () => void
}

export function ModalNotification({content, onClickOutside}: ModalNotificationProps)
{
	if (!content)
		return <></>	
	return (
		<Modal onClickOutside={() => { onClickOutside && onClickOutside(); }}>
			{content}
		</Modal>
	)
}