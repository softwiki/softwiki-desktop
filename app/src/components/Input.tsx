import styled from "styled-components"

export default styled.input`

	padding: 4px;
	padding-left: 8px;
	padding-right: 8px;

	border: none;
	border-radius: 4px;
	background-color: ${({theme}) => theme.input.backgroundColor};
	color: ${({theme}) => theme.input.textColor};
`