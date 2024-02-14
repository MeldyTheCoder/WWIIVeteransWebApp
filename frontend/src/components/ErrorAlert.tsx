import { useEffect, useState } from "react"
import { Collapse, Alert } from "react-bootstrap"
import IErrorAlertProps from "./types/IErrorAlert"
import { wait } from "../api/Types"


const ErrorAlert = ({
    errorText,
    show,
    onClose
}: IErrorAlertProps) => {
    const [showing, setShowing] = useState<boolean>(!!show)

    useEffect(
        () => {
            setShowing(!!show)
            wait(5000).then(() => setShowing(false))
        }, [show]
    )

    return (
        <Collapse in={showing} onExited={() => onClose?.()}>
            <div className='RootWindow_error'>
                <Alert variant='danger' closeVariant="button">
                    <b>Ошибка:</b> {errorText}
                </Alert>
            </div>
        </Collapse>
    )
}

export default ErrorAlert;