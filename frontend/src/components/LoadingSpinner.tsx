import {useState} from 'react';
import { MoonLoader } from 'react-spinners';
import { Col, Row } from 'react-bootstrap';


interface ILoadingSpinner {
    show?: boolean
}

const LoadingSpinner = ({
    show
}: ILoadingSpinner) => {

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