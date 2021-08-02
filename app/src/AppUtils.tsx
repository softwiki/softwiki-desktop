import MessageBox from "components/MessageBox"
import Modal from "components/Modal"
import { useState } from "react"

class AppUtilsControllerClass
{
	public PopConfirmationBox = (text: string, yesFunc?: () => void | undefined, noFunc?: () => void | undefined) => {}
}

export const AppUtilsController = new AppUtilsControllerClass()

export function AppUtils()
{
	return (
		<div>
			<ConfirmationBox/>
		</div>
	)
}

function ConfirmationBox()
{
	const [showMessageBox, SetShowMessageBox] = useState(false)
	const [messageBoxText, SetMessageBoxText] = useState("")
	const [yesFunction, SetYesFunction] = useState<(() => void) | undefined>(undefined)
	const [noFunction, SetNoFunction] = useState<(() => void) | undefined>(undefined)

	AppUtilsController.PopConfirmationBox = (text: string, yesFunc?: () => void | undefined, noFunc?: () => void | undefined) => 
	{
		SetMessageBoxText(text)
		SetYesFunction(() => yesFunc)
		SetNoFunction(() => noFunc)
		SetShowMessageBox(true)
	}

	return (
		<div>
			{
				showMessageBox ?
					<Modal>
						<MessageBox
							text={messageBoxText}
							yesFunction={() => 
							{ 
								yesFunction && yesFunction()
								SetShowMessageBox(false)
							}}
							noFunction={() => 
							{ 
								noFunction && noFunction()
								SetShowMessageBox(false)
							}}
						/>
					</Modal>
					: ""
			}
		</div>
	)
}