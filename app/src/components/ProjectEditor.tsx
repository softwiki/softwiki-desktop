import DataApi from "softwiki-core/data/DataApi";
import { Project } from "softwiki-core/models/Project";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";

const ProjectEditorLayout = styled.div`

`

const Name = styled(Input)`
	margin-right: 4px; 
`

interface ProjectEditorProps
{
	project: Project | undefined
	onSave?: () => void
}

export default function ProjectEditor({project, onSave: onSave}: ProjectEditorProps)
{
	const [name, setName] = useState(project ? project.getName() : "Untitled")

	return (
		<ProjectEditorLayout>
			<Name value={name} onChange={(e: any) => { setName(e.target.value) }}></Name>
			<Button onClick={() => 
			{
				if (project)
				{
					project.setName(name)
				}
				else
				{
					DataApi.createProject({name})
				}
				onSave && onSave()
			}}>Save & Close</Button>
		</ProjectEditorLayout>
	)
}