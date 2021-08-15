import styled from "styled-components";

export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	background-color: ${({theme}) => theme.categories.list.headerColor};
	padding: 8px;
`