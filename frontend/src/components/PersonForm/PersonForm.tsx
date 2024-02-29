import { useState } from 'react'
import { Modal, Col, Form, Button, Image, Collapse} from 'react-bootstrap'
import { Formik } from 'formik';
import { PersonFormSchema } from '../../interfaces/IPerson';
import IPersonFormProps from './IPersonForm';
import './PersonForm.less';


const DEFAULT_PHOTO_URL = 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'

const PersonForm = ({
    asModal,
    show,
    handleSubmit,
    handleClose
}: IPersonFormProps) => {
    const [submited, setSubmited] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<boolean>(false)

    const renderContent = () => (
        <Formik
            validationSchema={PersonFormSchema}
            onSubmit={submitForm}
            initialValues={{
                firstName: '',
                lastName: '',
                surname: '',
                description: 'Описание ветерана',
                quote: 'Цитата',
                photoUrl: '',
                yearsOfBattle: [],
                dateOfBirth: '',
                dateOfDeath: ''
            }}

        >   
            {({ handleChange, handleSubmit, values, errors, touched }) => (
                <Form onSubmit={handleSubmit} className='person-form_root text-white py-2' noValidate>
                    <Form.Group className='person-form_firstName mb-2'>
                        <Form.Label>Имя ветерана</Form.Label>
                        <Form.Control 
                            name='firstName' 
                            value={values.firstName} 
                            onChange={handleChange}
                            isValid={touched.firstName && !errors.firstName}
                            isInvalid={touched.firstName && !!errors.firstName}
                        />

                        <Form.Control.Feedback type='invalid'>
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className='person-form_lastName mb-2'>
                        <Form.Label>Фамилия ветерана</Form.Label>
                        <Form.Control 
                            name='lastName' 
                            value={values.lastName} 
                            onChange={handleChange}
                            isInvalid={touched.lastName && !!errors.lastName}
                            isValid={touched.lastName && !errors.lastName}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className='person-form_surname mb-2'>
                        <Form.Label>Отчество ветерана</Form.Label>
                        <Form.Control 
                            name='surname' 
                            value={values.surname} 
                            onChange={handleChange}
                            isInvalid={touched.surname && !!errors.surname}
                            isValid={touched.surname && !errors.surname}
                        />

                        <Form.Control.Feedback type='invalid'>
                            {errors.surname}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='person-form_description mb-2'>
                        <Form.Label>Описание подвигов</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            name='description' 
                            value={values.description} 
                            onChange={handleChange}
                            isValid={touched.description && !errors.description}
                            isInvalid={touched.description && !!errors.description}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className='person-form_quote mb-2'>
                        <Form.Label>Цитата</Form.Label>
                        <Form.Control 
                            name='quote' 
                            value={values.quote} 
                            onChange={handleChange}
                            isValid={touched.quote && !errors.quote}
                            isInvalid={touched.quote && !!errors.quote}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.quote}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className='person-form_photoUrl mb-2'>
                        <Col className='d-flex justify-content-between align-items-center'>
                            <Form.Label>Ссылка на изображение ветерана</Form.Label>

                            <Button 
                                className="person-form_image-preview-button" 
                                variant='link' 
                                onClick={() => setImagePreview(!imagePreview)}
                            >
                                {imagePreview ? "🔍" : "🔎"}
                            </Button>
                        </Col>  
                        
                        {imagePreview && 
                            <div className='person-form_image-preview d-flex justify-content-center pb-2'>
                                <Image className="person-form_image-preview_photo" src={values.photoUrl || DEFAULT_PHOTO_URL} rounded/>
                            </div>
                        }

                        <Form.Control 
                            name='photoUrl' 
                            value={values.photoUrl} 
                            onChange={handleChange}
                            isInvalid={touched.photoUrl && !!errors.photoUrl}
                            isValid={touched.photoUrl && !errors.photoUrl}
                        />
                        
                        <Form.Control.Feedback type='invalid'>
                            {errors.photoUrl}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className='person-form_yearsOfBattle mb-2'>
                        <Form.Label>Годы войны</Form.Label>
                        <Form.Select
                            name='yearsOfBattle'
                            onChange={handleChange}
                            isInvalid={touched.yearsOfBattle && !!errors.yearsOfBattle}
                            multiple
                        >
                            <option value='1939'>1939</option>
                            <option value='1940'>1940</option>
                            <option value='1941'>1941</option>
                            <option value='1942'>1942</option>
                            <option value='1943'>1943</option>
                            <option value='1944'>1944</option>
                            <option value='1945'>1945</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>
                            {errors.yearsOfBattle}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='person-form_dateOfBirth mb-2'>
                        <Form.Label>Дата рождения ветерана</Form.Label>
                        <Form.Control 
                            type="date" 
                            name='dateOfBirth' 
                            value={values.dateOfBirth} 
                            onChange={handleChange}
                            isInvalid={touched.dateOfBirth && !!errors.dateOfBirth}
                            isValid={touched.dateOfBirth && !errors.dateOfBirth}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.dateOfBirth}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className='person-form_dateOfDeath mb-3'>
                        <Form.Label>Дата смерти ветерана</Form.Label>
                        <Form.Control 
                            type="date" 
                            name='dateOfDeath' 
                            value={values.dateOfDeath} 
                            onChange={handleChange}
                            isValid={touched.dateOfDeath && !errors.dateOfDeath}
                            isInvalid={touched.dateOfDeath && !!errors.dateOfDeath}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.dateOfDeath}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Col sm className='d-flex justify-content-between'>
                        <Button type='submit' variant='success'>Создать</Button>
                        {asModal && 
                            <Button variant='outline-danger' onClick={() => closeForm()}>Закрыть</Button>
                        }
                    </Col>
                </Form>
            )}
        </Formik>
    )

    const submitForm = (values: any) => {
        setSubmited(true)
        return handleSubmit?.(values)
    }

    const closeForm = () => {
        handleClose?.()
    }

    return (
        <div className='person_creation-form'>
            {asModal && 
                <Modal show={show && !submited} className='person-form_root text-white'>
                    <Modal.Header className='text-center'>
                        <Modal.Title className='text-center'>
                            Регистрация ветерана
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {renderContent()}
                    </Modal.Body>
                </Modal>
            }

            {!asModal && renderContent()}
        </div>
    )
}

export default PersonForm