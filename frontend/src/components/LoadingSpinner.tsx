import { MoonLoader } from 'react-spinners';
import { Modal } from 'react-bootstrap';
import ILoadingSpinnerProps from './types/ILoadingSpinner';
import "./styles/LoadingSpinner.css";


const LoadingSpinner = ({
    show
}: ILoadingSpinnerProps) => {

    if (show) {
        return (
            <Modal show={show} centered size='sm'>
                <Modal.Body className='loading-spinner_modal-body d-flex justify-content-center'>
                    <MoonLoader loading={show} size={50} color='white'/>
                </Modal.Body>
            </Modal>
        )
    }

    return null
}

export default LoadingSpinner