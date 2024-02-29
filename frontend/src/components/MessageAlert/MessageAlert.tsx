import { useEffect, useState } from "react"
import { Collapse, Alert } from "react-bootstrap"
import IMessageAlertProps from "./IMessageAlert"
import { wait } from "../../api/Types"


const MessageAlert = ({
    message,
    show,
    onClose
}: IMessageAlertProps) => {
    const [showing, setShowing] = useState<boolean>(false)

    const messagePrefixes = {
        'danger': 'Ошибка',
        'warning': 'Внимание',
        'success': 'Информация'
    } 

    useEffect(
        () => {
            setShowing(true)
            wait(5000).then(() => setShowing(false))
        }, [show]
    )

    return (
        <Collapse in={showing && !!message} onExited={() => onClose?.()}>
            <div className='RootWindow_error'>
                <Alert variant={message?.type} closeVariant="button">
                    <b>{messagePrefixes[message?.type || 'warning']}:</b> {message?.text}
                </Alert>
            </div>
        </Collapse>
    )
}

export default MessageAlert;