import Button from "components/Button";
import Modal from "components/Modal"
import React, { useContext } from "react";
import { useState } from "react"
import styled from "styled-components";

const NotificationContext = React.createContext<any>({});

export function useNotification()
{
	return useContext(NotificationContext);
}

interface ConfirmationBoxProperties
{
	message: string
	yesFunction: () => void
	noFunction: () => void
}

export function Notifications({children}: {children: JSX.Element | JSX.Element[]})
{
	const [confirmationMessage, setConfirmationMessage] = useState<ConfirmationBoxProperties>({
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

	return (
		<NotificationContext.Provider value={{popConfirmationMessage}}>
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
		</NotificationContext.Provider>
	)
}

interface ConfirmationBoxProps extends ConfirmationBoxProperties
{
	close: () => void
}

function ConfirmationMessage({message, yesFunction, noFunction, close}: ConfirmationBoxProps)
{
	if (message === "")
		return <></>

	return (
		<Modal>
			<>
				<Text>{message}</Text>
				<Buttons>
					<NoButton onClick={() => { noFunction(); close(); }}>No</NoButton>
					<YesButton onClick={() => { yesFunction(); close(); }}>Yes</YesButton>
				</Buttons>
			</>
		</Modal>
	)
}

const Text = styled.p`
	margin-top: 0;
	margin-bottom: 16px;

	font-size: 1.25rem;
`

const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`

const YesButton = styled(Button)`
	background-color: rgb(0, 200, 0);
	font-weight: bold;
	font-size: 1.25rem;
`

const NoButton = styled(Button)`
	background-color: rgb(200, 0, 0);
	font-weight: bold;
	font-size: 1.25rem;
`