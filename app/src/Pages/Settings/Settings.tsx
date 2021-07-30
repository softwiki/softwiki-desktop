import Button from "Components/Button"
import HorizontalLineSpacer from "Components/HorizontalLineSpacer"
import styled from "styled-components"
import TagsSettings from "./Tags"

import Appearance from "./Appearance"

const SettingsLayout = styled.div`
	display: flex;
	flex-direction: column;

	width: 25vw;
	padding: 8px;

	background-color: ${({theme}) => theme.SideBarColor};
`

const Title = styled.p`
	margin-top: 0;
	margin-right: auto;
`

const Bar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`

interface SettingsProps
{
	Close: Function
}

export default function Settings({Close}: SettingsProps)
{
	return (
		<SettingsLayout>
			<Bar>
				<Title>Settings</Title>
				<Button onClick={() => { Close() }}>Close</Button>
			</Bar>
			<div>
				<SettingCategory title="Appearance">
					<Appearance/>
				</SettingCategory>
				<SettingCategory title="Tags">
					<TagsSettings/>
				</SettingCategory>
			</div>
		</SettingsLayout>
	)
}

const SettingCategoryLayout = styled.div`
	:not(:first-child) {
		margin-top: 32px;
	}
`

const SettingCategoryTitle = styled.h2`
	margin: 0;	
`

interface SettingCategoryProps
{
	title: string
	children: JSX.Element
}

function SettingCategory({title, children}: SettingCategoryProps)
{
	return (
		<SettingCategoryLayout>
			<SettingCategoryTitle>{title}</SettingCategoryTitle>
			<HorizontalLineSpacer/>
			{children}
		</SettingCategoryLayout>
	)
}