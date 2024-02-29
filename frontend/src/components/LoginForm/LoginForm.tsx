import { useNavigate } from "react-router-dom"
import { Form, Button, Col } from "react-bootstrap"
import ILoginFormProps, { LoginSchema } from "./ILoginForm"
import { Formik } from "formik"
import './LoginForm.less';

const initialValues = {
    email: '',
    password: ''
}


const LoginForm = ({
    onClose,
    onSubmit
}: ILoginFormProps) => {
    const navigate = useNavigate()

    const handleSubmit = (values: any) => {
        console.log(values)
        onSubmit?.(values)
    }

    return (
        <Formik
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
            initialValues={initialValues}
        >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-2 pb-2">
                        <Form.Label>
                            Эл. почта
                        </Form.Label>

                        <Form.Control 
                            name='email'
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={touched.email && !!errors.email}
                            isValid={touched.email && !errors.email}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2 pb-2">
                        <Form.Label>
                            Пароль
                        </Form.Label>

                        <Form.Control 
                            name='password'
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={touched.password && !!errors.password}
                            isValid={touched.password && !errors.password}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Col className="d-flex justify-content-between pt-2">
                        <Button type='submit' variant='success'>Вход</Button>
                        <Button variant="secondary" onClick={() => navigate('/registration')}>Регистрация</Button>
                    </Col>
                </Form>
            )
            
            }

        </Formik>
    )
}  

export default LoginForm