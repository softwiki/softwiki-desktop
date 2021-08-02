import styled from "styled-components"

const HorizontalLineSpacerLayout = styled.div`
	border-top: 1px solid ${({theme}) => theme.settings.spacerColor};
	margin: 8px 0 8px 0;
`

export default function HorizontalLineSpacer()
{
	return <HorizontalLineSpacerLayout/>
}