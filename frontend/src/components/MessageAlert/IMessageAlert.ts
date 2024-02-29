


type IMessage = {
    text: string,
    type: 'warning' | 'danger' | 'success'
  }

  
interface IMessageAlertProps {
    message?: IMessage
    show?: boolean
    onClose?: () => void
}

export default IMessageAlertProps
export type {IMessage}
