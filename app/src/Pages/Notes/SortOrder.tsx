import Popup from "Components/Popup";
import { useState } from "react";
import styled from "styled-components";
import sortImage from "Images/sort.png"

export enum SortOrder
{
	Alphabetical = 0,
	AlphabeticalReverse,
	CreationDate,
	CreationDateReverse
}

const SortOrderWidgetLayout = styled.div`
	position: relative;
`

const Line = styled.div`
	white-space: nowrap;
	
	:not(:last-child)
	{
		margin-bottom: 4px;
	}
`

const SortIconWrapper = styled.div`
	padding: 4px;
	border-radius: 4px;
	background-color: ${({theme}) => theme.input.backgroundColor};
	cursor: pointer;
`

const SortIcon = styled.img`
	width: 16px;
	filter: invert(66%) sepia(98%) saturate(13%) hue-rotate(55deg) brightness(60%) contrast(87%);
`

interface SortOrderWidgetProps
{
	sortOrder: SortOrder
	OnChange: (newSortOrder: SortOrder) => void
}

export default function SortOrderWidget({sortOrder, OnChange}: SortOrderWidgetProps)
{
	const [show, SetShow] = useState<boolean>(false)

	return (
		<SortOrderWidgetLayout>
			<SortIconWrapper onClick={() => { if (!show) SetShow(true) }}>
				<SortIcon src={sortImage}/>
			</SortIconWrapper>
			<Popup
				show={show}
				OnClickOutside={() => { setTimeout(() =>{ SetShow(false) }) }}>
				<Line
					style={{opacity: sortOrder === SortOrder.Alphabetical ? "1" : "0.5"}}
					onClick={() => { OnChange(SortOrder.Alphabetical) }}
				>
					Alphabetical
				</Line>
				<Line
					style={{opacity: sortOrder === SortOrder.AlphabeticalReverse ? "1" : "0.5"}}
					onClick={() => { OnChange(SortOrder.AlphabeticalReverse) }}
				>
					(r) Alphabetical
				</Line>
				<Line
					style={{opacity: sortOrder === SortOrder.CreationDate ? "1" : "0.5"}}
					onClick={() => { OnChange(SortOrder.CreationDate) }}
				>
					Creation Date
				</Line>
				<Line
					style={{opacity: sortOrder === SortOrder.CreationDateReverse ? "1" : "0.5"}}
					onClick={() => { OnChange(SortOrder.CreationDateReverse) }}
				>
					(r) Creation Date
				</Line>
			</Popup>
		</SortOrderWidgetLayout>
	)
}