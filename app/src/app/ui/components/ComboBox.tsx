import styled from "styled-components";

export const ComboBox = styled.select`
	padding: 4px;
	appearance: none;
	background-color: ${({theme}) => theme.comboBox.color};	
	color: ${({theme}) => theme.comboBox.textColor};

	border: none;
	border-radius: 4px;
	
	cursor: pointer;
`

export const ComboBoxItem = styled.option`
`