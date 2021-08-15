import { Category } from "softwiki-core/models";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import { useData } from "Data";

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

	return (
		<CategoryEditorLayout>
			<Name value={name} onChange={(e: any) => { setName(e.target.value) }}></Name>
			<Button onClick={() => 
			{
				if (category)
				{
					category.setName(name)
				}
				else
				{
					api.createCategory({name})
				}
				onSave && onSave()
			}}>Save & Close</Button>
		</CategoryEditorLayout>
	)
}