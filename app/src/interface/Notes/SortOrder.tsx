import Popup from "components/Popup";
import { useState } from "react";
import styled from "styled-components";
import sortImage from "images/sort.png"

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
	background-color: ${({theme}) => theme.input.color};
	cursor: pointer;
`

const SortIcon = styled.img`
	width: 16px;
	filter: invert(66%) sepia(98%) saturate(13%) hue-rotate(55deg) brightness(60%) contrast(87%);
`

interface SortOrderWidgetProps
{
	sortOrder: SortOrder
	onChange: (newSortOrder: SortOrder) => void
}

export default function SortOrderWidget({sortOrder, onChange}: SortOrderWidgetProps)
{
	const [show, setShow] = useState<boolean>(false)

	return (
		<SortOrderWidgetLayout>
			<SortIconWrapper onClick={() => { if (!show) setShow(true) }}>
				<SortIcon src={sortImage}/>
			</SortIconWrapper>
			<Popup
				show={show}
				onClickOutside={() => { setTimeout(() =>{ setShow(false) }) }}>
				<Line
					style={{opacity: sortOrder === SortOrder.Alphabetical ? "1" : "0.5"}}
					onClick={() => { onChange(SortOrder.Alphabetical) }}
				>
					Alphabetical
				</Line>
				<Line
					style={{opacity: sortOrder === SortOrder.AlphabeticalReverse ? "1" : "0.5"}}
					onClick={() => { onChange(SortOrder.AlphabeticalReverse) }}
				>
					(r) Alphabetical
				</Line>
				<Line
					style={{opacity: sortOrder === SortOrder.CreationDate ? "1" : "0.5"}}
					onClick={() => { onChange(SortOrder.CreationDate) }}
				>
					Creation Date
				</Line>
				<Line
					style={{opacity: sortOrder === SortOrder.CreationDateReverse ? "1" : "0.5"}}
					onClick={() => { onChange(SortOrder.CreationDateReverse) }}
				>
					(r) Creation Date
				</Line>
			</Popup>
		</SortOrderWidgetLayout>
	)
}