import styled from "styled-components";

export default styled.button`
	background: none;
	color: ${({theme}) => theme.addButton.color};
	border: 2px solid ${({theme}) => theme.addButton.color};
	border-radius: 4px;

	font-weight: bold;

	cursor: pointer;
	margin-left: 16px;
	
	transition-duration: 0.25s;

	&:hover
	{
		color: ${({theme}) => theme.addButton.colorHover};
		border: 2px solid ${({theme}) => theme.addButton.colorHover};
	}

	&:after
	{
		content: "+";
	}
`