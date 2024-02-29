import {useState, useEffect} from 'react';
import { Alert, Fade } from 'react-bootstrap';
import IErrorBlockProps from './IErrorBlock';


const ErrorBlock = ({
    title,
    description,
    variant,
    closeble
}: IErrorBlockProps) => {
    const [animate, setAnimate] = useState<boolean>(false)

    useEffect(() => {
        setAnimate(true)
    }, [])
    
    return (
        <Fade in={animate} className='py-2'>
            <div className='ErrorBlock_root text-center'>
                <Alert variant={variant} dismissible={closeble}>
                    <Alert.Heading>{title}</Alert.Heading>
                    <p>
                    {description}
                    </p>
                </Alert>
            </div>
        </Fade>
    )
}

export default ErrorBlock;


