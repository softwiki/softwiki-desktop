import Button from "app/components/Button";
import Modal from "app/components/Modal"
import styled from "styled-components";

export interface ConfirmationMessageProperties
{
	message: string
	yesFunction: () => void
	noFunction: () => void
}

interface ConfirmationBoxProps extends ConfirmationMessageProperties
{
	close: () => void
}

export function ConfirmationMessage({message, yesFunction, noFunction, close}: ConfirmationBoxProps) {
	if (message === "")
		return <></>

	return (
		<Modal>
			<>
				<Text>{message}</Text>
				<Buttons>
					<NoButton onClick={() => { noFunction(); close(); }}>NO</NoButton>
					<YesButton onClick={() => { yesFunction(); close(); }}>YES</YesButton>
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
	padding: 4px 8px 4px 8px;

	background-color: rgb(200, 0, 0);
	font-size: 1.25rem;
`

const NoButton = styled(Button)`
	padding: 0 8px 0 8px;

	font-size: 1.25rem;
`