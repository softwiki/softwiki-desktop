import styled from "styled-components"

const TextAreaLayout = styled.textarea`
	padding: 4px;
	padding-left: 8px;
	padding-right: 8px;

	border: none;
	border-radius: 4px;
	background-color: rgb(75, 75, 75);
	color: white;
`

export default function Input(props: any)
{
	return <TextAreaLayout {...props} />
}