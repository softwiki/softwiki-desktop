import ReactMarkdown from "react-markdown"
import gfm from 'remark-gfm'

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"

const components = {
	code({node, inline, className, children, ...props}: any) {
		const match = /language-(\w+)/.exec(className || '') || ""
		if (!inline)
		{
			return <SyntaxHighlighter wrapLongLines style={tomorrow} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
		}
		return <SyntaxHighlighter customStyle={{padding: "4px", borderRadius: "6px"}} wrapLongLines style={tomorrow} PreTag="span" children={String(children).replace(/\n$/, '')} {...props} />
	}
}

export default function Markdown(props: any)
{
	return (
		<ReactMarkdown components={components} remarkPlugins={[gfm]}>
			{props.children}
		</ReactMarkdown>
	)
}