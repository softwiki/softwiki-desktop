import Markdown from "components/Markdown"
import styled from "styled-components"

const HelpLayout = styled.div`
	width: 50vw;
	height: 75vh;
	padding: 8px;
	overflow-y: scroll;

	background-color: ${({theme}) => theme.SideBarColor};
	font-size: 1rem;
`

export default function Settings()
{
	return (
		<HelpLayout>
			<Markdown>
				{`
# Markdown
---
\`\`\`md
# Header
## Header
### Header
A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
\`\`\`

# Header
## Header
### Header
A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`}
			</Markdown>
		</HelpLayout>
	)
}