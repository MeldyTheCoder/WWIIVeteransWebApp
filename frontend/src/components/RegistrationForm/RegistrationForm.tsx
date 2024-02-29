import { useNavigate } from "react-router-dom"
import { Form, Button, Col, Fade } from "react-bootstrap"
import IRegistrationFormProps, { RegistrationSchema } from "./IRegistrationForm"
import TooltipButton from "../TooltipButton/TooltipButton"
import { Formik } from "formik"
import './RegistrationForm.less'


const initialValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
}


const RegistrationForm = ({
    onClose,
    onSubmit
}: IRegistrationFormProps) => {
    const navigate = useNavigate()

    const handleSubmit = (values: any) => {
        console.log(values)
        onSubmit?.(values)
    }

    return (
        <Formik
            validationSchema={RegistrationSchema}
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

                    <Form.Group className="mb-2 pb-2">
                        <Form.Label>
                            Имя
                        </Form.Label>

                        <Form.Control 
                            name='firstName'
                            value={values.firstName}
                            onChange={handleChange}
                            isInvalid={touched.firstName && !!errors.firstName}
                            isValid={touched.firstName && !errors.firstName}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2 pb-2">
                        <Form.Label>
                            Фамилия
                        </Form.Label>

                        <Form.Control 
                            name='lastName'
                            value={values.lastName}
                            onChange={handleChange}
                            isInvalid={touched.lastName && !!errors.lastName}
                            isValid={touched.lastName && !errors.lastName}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Col className="d-flex justify-content-between pt-2">
                        <TooltipButton 
                            type='submit' 
                            variant='success' 
                            tooltipText="Зарегистрироваться в WWII"
                        >
                            Регистрация
                        </TooltipButton>

                        <TooltipButton 
                            variant="secondary" 
                            onClick={() => navigate('/login')}
                            tooltipText="Если у Вас уже есть аккаунт, вы можете в него войти."
                        >
                            Вход
                        </TooltipButton>
                    </Col>
                </Form>
            )
            
            }

        </Formik>
    )
}  

export default RegistrationForm