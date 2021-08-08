import Modal from "components/Modal";

interface ModalNotificationProps
{
	content: JSX.Element | null
}

export function ModalNotification({content}: ModalNotificationProps)
{
	if (!content)
		return <></>	
	return (
		<Modal>
			{content}
		</Modal>
	)
}