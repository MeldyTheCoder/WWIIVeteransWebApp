import { Modal, Button } from "react-bootstrap"
import { useAuthContext } from "../../contexts/AuthContext"

import "./LogoutModal.less"

interface ILogoutModal {
    show?: boolean
    onConfirm?: () => void | any
    onDecline?: () => void | any
}


const LogoutModal = ({
    show,
    onConfirm,
    onDecline
}: ILogoutModal) => {
    const { authData } = useAuthContext()

    const handleConfirm = (data: any) => onConfirm?.()
    const handleDecline = (data: any) => onDecline?.()

    return (
        <Modal className="logout-modal_root" show={show} backdrop="static">
            <Modal.Header>
                <h5>Выход</h5>
            </Modal.Header>

            <Modal.Body className="logout-modal_body">
                Вы уверены, что хотите выйти из аккаунта <b>{authData?.user?.email}</b>?
            </Modal.Body> 

            <Modal.Footer className="logout-modal_footer">
                <Button 
                    onClick={handleConfirm}
                    variant="danger"
                >
                    Выход
                </Button>

                <Button
                    onClick={handleDecline}
                    variant="outline-secondary"
                >
                    Отмена
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LogoutModal