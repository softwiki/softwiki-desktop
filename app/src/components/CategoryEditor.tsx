import { Category } from "softwiki-core/objects";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import { useData } from "Data";
import { useMessage } from "messages";

const CategoryEditorLayout = styled.div`

`

const Name = styled(Input)`
	margin-right: 4px; 
`

interface CategoryEditorProps
{
	category: Category | undefined
	onSave?: () => void
}

export default function CategoryEditor({category, onSave: onSave}: CategoryEditorProps)
{
	const [name, setName] = useState(category ? category.getName() : "Untitled")
	const { api } = useData();
	const { pushErrorIfFails } = useMessage();

	return (
		<CategoryEditorLayout>
			<Name value={name} onChange={(e: any) => { setName(e.target.value) }}></Name>
			<Button onClick={() => 
			{
				pushErrorIfFails(async () =>
				{
					if (category)
						await category.setName(name)
					else
						await api.createCategory({name})
					onSave && onSave()
				})
			}}>Save & Close</Button>
		</CategoryEditorLayout>
	)
}