import styled from "styled-components"

export default styled.input`

	padding: 4px;
	padding-left: 8px;
	padding-right: 8px;

	border: none;
	background-color: ${({theme}) => theme.input.backgroundColor};
	border-radius: 4px;
	color: ${({theme}) => theme.input.textColor};
`