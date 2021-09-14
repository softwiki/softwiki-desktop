import Button from "app/components/Button"
import HorizontalLineSpacer from "app/components/HorizontalLineSpacer"
import styled from "styled-components"

import Appearance from "./Appearance"

const SettingsLayout = styled.div`
	display: flex;
	flex-direction: column;

	width: 25vw;
	padding: 8px;
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
	close: () => void
}

export default function Settings({close}: SettingsProps) {
	return (
		<SettingsLayout>
			<Bar>
				<Title>Settings</Title>
				<Button onClick={() => { close() }}>Save and close</Button>
			</Bar>
			<div>
				<SettingCategory title="Appearance">
					<Appearance/>
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

function SettingCategory({title, children}: SettingCategoryProps) {
	return (
		<SettingCategoryLayout>
			<SettingCategoryTitle>{title}</SettingCategoryTitle>
			<HorizontalLineSpacer/>
			{children}
		</SettingCategoryLayout>
	)
}