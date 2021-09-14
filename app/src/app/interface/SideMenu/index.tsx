import styled from "styled-components";
import Categories from "./Categories";
import { Tags } from "./Tags";

const SideMenuLayout = styled.div`
	display: flex;
	flex-direction: column;

	background-color: ${({theme}) => theme.categories.list.color};
`

export default function SideMenu() {
	return (
		<SideMenuLayout>
			<Categories/>
			<Tags/>
		</SideMenuLayout>
	)
}

