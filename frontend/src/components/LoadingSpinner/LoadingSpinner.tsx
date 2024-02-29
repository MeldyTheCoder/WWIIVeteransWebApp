import { MoonLoader } from 'react-spinners';
import { Modal } from 'react-bootstrap';
import ILoadingSpinnerProps from './ILoadingSpinner';
import "./LoadingSpinner.less";


const LoadingSpinner = ({
    show
}: ILoadingSpinnerProps) => {

    if (show) {
        return (
            <Modal show={show} centered size='sm' className='loading-spinner_root'>
                <Modal.Body className='loading-spinner_modal-body d-flex justify-content-center'>
                    <MoonLoader loading={show} size={50} color="red" className='loading-spinner_spinner'/>
                </Modal.Body>
            </Modal>
        )
    }

    return null
}

export default LoadingSpinner