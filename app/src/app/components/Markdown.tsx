import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"
import styled from "styled-components";

const components = {
	code({/*node, */inline, className, children, ...props}: any) {
		const match = /language-(\w+)/.exec(className || "") || ""
		if (!inline) {
			return <SyntaxHighlighter wrapLongLines style={tomorrow} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, "")} {...props} />
		}
		return <SyntaxHighlighter customStyle={{padding: "4px", borderRadius: "6px"}} wrapLongLines style={tomorrow} PreTag="span" children={String(children).replace(/\n$/, "")} {...props} />
	}
}

function attacher(): any {
	return (tree: any) => {
		console.log(tree)
		for (const child of tree.children) {
			if (child.type === "paragraph") {
				for (const child2 of child.children) {
					if (child2.type === "link") {
						console.log(child2);
						child2.url += " LOL"
					}
				}
			}
		}
	}
}

const MarkdownCustomStyle = styled.div`
	& table
	{
		border-collapse: collapse;
		border-radius: 4px;
	}

	& tr
	{
		border: 1px solid ${({theme}) => theme.notes.content.textColor};
	}

	& td:not(:first-child), & th:not(:first-child)
	{
		border-left: 1px solid ${({theme}) => theme.notes.content.textColor};
	}

	& td, & th
	{
		padding: 4px;
		text-align: left;
	}

	& th
	{
		background-color: rgb(255, 255, 255, 0.05)
	}
`

export default function Markdown(props: any) {
	return (
		<MarkdownCustomStyle style={{...props.style, display: "block"}} className="react-markdown">
			<ReactMarkdown components={components} remarkPlugins={[gfm]} rehypePlugins={[attacher]}>
				{props.children}
			</ReactMarkdown>
		</MarkdownCustomStyle>
	)
}