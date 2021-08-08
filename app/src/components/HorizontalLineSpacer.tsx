import styled from "styled-components"

const HorizontalLineSpacerLayout = styled.div<{marginTop: string, marginBottom: string}>`
	border-top: 1px solid ${({theme}) => theme.modal.spacerColor};
	margin: ${({marginTop}) => marginTop} 0 ${({marginBottom}) => marginBottom} 0;
`

interface HorizontalLineSpacerProps
{
	marginTop?: string
	marginBottom?: string
}

export default function HorizontalLineSpacer({marginTop, marginBottom}: HorizontalLineSpacerProps)
{
	return (
		<HorizontalLineSpacerLayout
			marginTop={marginTop ? marginTop : "8px"}
			marginBottom={marginBottom ? marginBottom : "8px"}
		/>
	)
}