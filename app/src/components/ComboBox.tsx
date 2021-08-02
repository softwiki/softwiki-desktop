import styled from "styled-components";

export const ComboBox = styled.select`
	padding: 4px;
	appearance: none;
	background-color: ${({theme}) => theme.comboBox.backgroundColor};	
	color: ${({theme}) => theme.comboBox.textColor};

	border: none;
	border-radius: 4px;
`

export const ComboBoxItem = styled.option`
`