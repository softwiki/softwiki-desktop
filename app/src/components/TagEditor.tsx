import { Tag } from "softwiki-core/models";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import { useData } from "Data";
import { ColorResult, SketchPicker } from "react-color";

const TagEditorLayout = styled.div`
	display: flex;
	flex-direction: column;
	width: 256px;
`

const Name = styled(Input)`
	margin: 4px 0 4px 0; 
`

interface TagEditorProps
{
	tag: Tag | null
	onSave?: () => void
}

export default function TagEditor({tag, onSave: onSave}: TagEditorProps)
{
	const [name, setName] = useState(tag ? tag.getName() : "Untitled")
	const [color, setColor] = useState(tag ? tag.getColor() : {r: 100, g: 100, b: 100, a:1});
	const {api} = useData();

	return (
		<TagEditorLayout>
			<SketchPicker color={color} onChange={(newColor: ColorResult) => {setColor(newColor.rgb)}} width={"auto"}/>
			<Name value={name} onChange={(e: any) => { setName(e.target.value) }}></Name>
			<Button onClick={() => 
			{
				if (tag)
				{
					tag.setAll({name, color});
				}
				else
				{
					api.createTag({name, color});
				}
				onSave && onSave()
			}}>Save & Close</Button>
		</TagEditorLayout>
	)
}