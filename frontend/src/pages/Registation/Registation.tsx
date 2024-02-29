import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Card, Fade, Collapse } from "react-bootstrap";
import RegistationForm from "../../components/RegistrationForm/RegistrationForm";
import WWIIAPIBackend from "../../api/Api";
import PersonList from "../../components/PersonList/PersonList";
import { useMainContext } from "../../contexts/MainContext";
import { useAuthContext } from "../../contexts/AuthContext";


const API = new WWIIAPIBackend()


const Registation = () => {
    const [showForm, setShowForm] = useState<boolean>(false)

    const { setMessage, handleError } = useMainContext()
    const { isLoggedIn } = useAuthContext()
    const navigate = useNavigate()
    
    const onSubmit = (data: any) => {
        API.registerUser(data.email, data.password, data.firstName, data.lastName)
        .catch(
            (error) => {
                handleError?.(error)
            }
        )
        .then(
            () => {
                navigate('/login')
                setMessage?.({type: 'success', text: 'Для продолжения войдите в свой новый аккаунт.'})
            }
        )
    }

    useEffect(
        () => {
            if (isLoggedIn) {
                return navigate('/')
            }

            setShowForm(true)
        }, []
    )
    
    return (
        <>
            <div className="d-flex justify-content-center">
                <Row className="py-4 w-50">
                    <Collapse in={showForm}>
                        <Card className="registration-form_card">
                            <Card.Header className="text-white text-center">
                                <h3>Регистрация</h3>
                            </Card.Header>

                        
                                <Card.Body>
                                    <RegistationForm onSubmit={onSubmit}/>
                                </Card.Body>
                        </Card>
                    </Collapse>
                </Row>
            </div>

            <p></p>

            <hr/>

            <PersonList maxElements={3}/>
        </>
    )
}

export default Registation;
