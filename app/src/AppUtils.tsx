import MessageBox from "components/MessageBox"
import Modal from "components/Modal"
import { useState } from "react"

class AppUtilsControllerClass
{
	public popConfirmationBox = (text: string, yesFunc?: () => void | undefined, noFunc?: () => void | undefined) => {}
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
	const [showMessageBox, setShowMessageBox] = useState(false)
	const [messageBoxText, setMessageBoxText] = useState("")
	const [yesFunction, setYesFunction] = useState<(() => void) | undefined>(undefined)
	const [noFunction, setNoFunction] = useState<(() => void) | undefined>(undefined)

	AppUtilsController.popConfirmationBox = (text: string, yesFunc?: () => void | undefined, noFunc?: () => void | undefined) => 
	{
		setMessageBoxText(text)
		setYesFunction(() => yesFunc)
		setNoFunction(() => noFunc)
		setShowMessageBox(true)
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
								setShowMessageBox(false)
							}}
							noFunction={() => 
							{ 
								noFunction && noFunction()
								setShowMessageBox(false)
							}}
						/>
					</Modal>
					: ""
			}
		</div>
	)
}