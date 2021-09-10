import styled from "styled-components";

const ButtonLayout = styled.button`

	padding: 4px;

	background-color: ${({ theme }) => theme.buttons.color};
	border: none;
	border-radius: 4px;
	color: ${({ theme }) => theme.buttons.textColor};
	cursor: pointer;

	transition-duration: 0.25s;

	:hover
	{
		background-color: ${({ theme }) => theme.buttons.colorHover};
	}
`

export default function Button(props: any)
{
	return <ButtonLayout {...props}/>
}