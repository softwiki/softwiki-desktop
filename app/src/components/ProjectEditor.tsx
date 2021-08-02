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
	OnSave?: () => void
}

export default function ProjectEditor({project, OnSave}: ProjectEditorProps)
{
	const [name, SetName] = useState(project ? project.GetName() : "Untitled")

	return (
		<ProjectEditorLayout>
			<Name value={name} onChange={(e: any) => { SetName(e.target.value) }}></Name>
			<Button onClick={() => 
			{
				if (project)
				{
					project.SetName(name)
				}
				else
				{
					DataApi.CreateProject({name})
				}
				OnSave && OnSave()
			}}>Save & Close</Button>
		</ProjectEditorLayout>
	)
}