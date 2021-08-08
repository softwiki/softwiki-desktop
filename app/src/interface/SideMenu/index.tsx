import styled from "styled-components";
import Projects from "./Projects";
import { Tags } from "./Tags";

const SideMenuLayout = styled.div`
	display: flex;
	flex-direction: column;

	background-color: ${({theme}) => theme.projects.list.color};
`

export default function SideMenu()
{
	return (
		<SideMenuLayout>
			<Projects/>
			<Tags/>
		</SideMenuLayout>
	)
}

