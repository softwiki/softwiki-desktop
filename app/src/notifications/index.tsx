import React, { useContext, useState } from "react";
import { ConfirmationMessage, ConfirmationMessageProperties } from "./confirmationMessage";
import { ModalNotification } from "./modal";

const NotificationContext = React.createContext<any>({});

export function useNotification()
{
	return useContext(NotificationContext);
}

export function Notifications({children}: {children: JSX.Element | JSX.Element[]})
{
	// Confirmation messsage box

	const [confirmationMessage, setConfirmationMessage] = useState<ConfirmationMessageProperties>({
		message: "",
		yesFunction: () => {},
		noFunction: () => {},
	});

	const popConfirmationMessage = (message: string, yesFunction?: () => void, noFunction?: () => void) =>
	{
		setConfirmationMessage({
			message,
			yesFunction: yesFunction ? yesFunction : () => {},
			noFunction: noFunction ? noFunction : () => {}
		});
	}

	// Modal

	const [modal, setModal] = useState<JSX.Element | null>(null);

	const popModal = (content: () => JSX.Element) => { setModal(content); }
	const closeModal = () => { setModal(null); }

	return (
		<NotificationContext.Provider
			value={{
				popConfirmationMessage,
				popModal,
				closeModal
			}}
		>
			{children}
			<ConfirmationMessage
				message={confirmationMessage.message}
				yesFunction={confirmationMessage.yesFunction}
				noFunction={confirmationMessage.noFunction}
				close={() =>
				{
					setConfirmationMessage({
						message: "",
						yesFunction: () => {},
						noFunction: () => {}
					});
				}}
			/>
			<ModalNotification content={modal} />
		</NotificationContext.Provider>
	)
}