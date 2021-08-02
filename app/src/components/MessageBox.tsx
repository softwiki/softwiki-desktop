import styled from "styled-components"
import Button from "./Button"

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

export default function MessageBox(props: {text: string, yesFunction?: () => void, noFunction?: () => void})
{
	return (
		<div>
			<Text>{props.text}</Text>
			<Buttons>
				{props.noFunction ? <NoButton onClick={() => { props.noFunction && props.noFunction() }}>No</NoButton> : ""}
				{props.yesFunction ? <YesButton onClick={() => { props.yesFunction && props.yesFunction() }}>Yes</YesButton> : ""}
			</Buttons>
		</div>
	)
}