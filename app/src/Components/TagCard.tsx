import styled from "styled-components"
import {Tag} from "SoftWiki-Core/Models/Tags"
import React from "react"

const Layout = styled.span`
	display: flex;
	justify-content: flex-start;
	align-items: center;

	padding: 4px;
	padding-right: 8px;

	border-radius: 4px;
	font-size: 0.75rem;
`

const ColoredCircle = styled.div`
	width: 8px;
	height: 8px;
	margin-right: 4px;
	
	border-radius: 128px;
`

const Cross = styled.div`
	max-width: 0;
	margin-left: 0;

	overflow: hidden;
	transition: max-width 0.5s, margin-left 0.5s;
	color: rgb(255, 100, 100);
	cursor: pointer;

	*:hover > & {
		margin-left: 8px;
		transition: max-width 0.5s, margin-left 0.5s;
		max-width: 100px;
	}	
`

interface TagCardProps
{
	tag: Tag
	style: React.CSSProperties
	OnClick?: Function
	OnCrossClick?: Function
}

export default function TagCard({tag, style = {}, OnClick, OnCrossClick}: TagCardProps)
{
	//style = {...style, backgroundColor: tag.GetColorAsCss()}
	style = {...style, border: "1px solid " + tag.GetColorAsCss()}
	return (
		<Layout style={style} onClick={() => { OnClick && OnClick() }}>
			<ColoredCircle style={{backgroundColor: tag.GetColorAsCss()}}/>
			<div>{tag.GetName()}</div>
			{OnCrossClick ? <Cross onClick={() => {OnCrossClick && OnCrossClick(tag)}}>x</Cross> : ""}
		</Layout>
	)
}