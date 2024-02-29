import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Collapse, Row } from "react-bootstrap";
import PersonList from "../../components/PersonList/PersonList";
import LoginForm from "../../components/LoginForm/LoginForm";
import WWIIAPIBackend from "../../api/Api";
import { useMainContext } from "../../contexts/MainContext";
import { useAuthContext } from "../../contexts/AuthContext";


const API = new WWIIAPIBackend()


const Login = () => {
    const [showForm, setShowForm] = useState<boolean>(false)

    const { setMessage, searchQuery, handleError } = useMainContext()
    const { isLoggedIn, authenticate } = useAuthContext()
    const navigate = useNavigate()
    
    const onSubmit = (data: any) => {
        API.getToken(data.email, data.password)
        .then(
            (data) => {
                if (data) {
                    authenticate(data)
                    setShowForm(false)
                    setMessage?.(undefined)
                    navigate('/')
                } else {
                    setMessage?.({type: 'danger', text: 'Ошибка авторизации. Повторите попытку позднее.'})
                }
            }
        )
        .catch(
            (error) => handleError?.(error)
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
                        <Card className="login-form_card">
                            <Card.Header className="text-white text-center">
                                <h3>Авторизация</h3>
                            </Card.Header>

                            <Card.Body>
                                <LoginForm onSubmit={onSubmit}/>
                            </Card.Body>
                        </Card>
                    </Collapse>
                </Row>
            </div>

            <p></p>

            <hr/>

            <PersonList searchQuery={searchQuery} maxElements={3}/>
        </>
    )
}

export default Login;
