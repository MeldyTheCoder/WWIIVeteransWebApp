import { MoonLoader } from 'react-spinners';
import { Col, Row } from 'react-bootstrap';
import ILoadingSpinnerProps from './types/ILoadingSpinner';


const LoadingSpinner = ({
    show
}: ILoadingSpinnerProps) => {

    if (show) {
        return (
            <Row>
                <Col className='d-flex justify-content-center py-5'>
                    <MoonLoader loading={show} size={50}/>
                </Col>
            </Row>
        )
    }

    return null
}

export default LoadingSpinner