import styled from "styled-components";

export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	background-color: ${({theme}) => theme.projects.list.headerColor};
	padding: 8px;
`