import MessageBox from "Components/MessageBox"
import Modal from "Components/Modal"
import { useState } from "react"

class AppUtilsControllerClass
{
	public PopConfirmationBox: Function = () => {}
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
  const [yesFunction, SetYesFunction] = useState<Function | null>(null)
  const [noFunction, SetNoFunction] = useState<Function | null>(null)

  AppUtilsController.PopConfirmationBox = (text: string, yesFunc: Function | null, noFunc: Function | null) => {
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
              yesFunction={() => { 
                yesFunction && yesFunction()
                SetShowMessageBox(false)
              }}
              noFunction={() => { 
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