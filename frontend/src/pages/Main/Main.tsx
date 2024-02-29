import { useState } from 'react';
import { Container, Col, Form, InputGroup, Dropdown } from 'react-bootstrap';
import WWIIAPIBackend from '../../api/Api';
import PersonForm from '../../components/PersonForm/PersonForm';
import SearchInfo from '../../components/SearchInfo/SearchInfo';
import MessageAlert from '../../components/MessageAlert/MessageAlert';
import MainContext from '../../contexts/MainContext';
import { IMessage } from '../../components/MessageAlert/IMessageAlert';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './MainProvider.less';
import LogoutModal from '../../components/LogoutModal/LogoutModal';
import { AxiosError } from 'axios';

const statusCodeMessages: any = {
  401: 'Для продолжения авторизуйтесь в системе.',
  500: 'Сервер в настоящий момент недоступен.',
  404: 'По данному запросу ничего не найдено.',
  422: 'Ошибка валидации в бэкенде.',
  0: 'Произошла неизвестная ошибка. Повторите попытку позднее'
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}


type IMain = {
  children?: React.ReactNode
}

const Main = ({children}: IMain) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showCreationForm, setShowCreationForm] = useState<boolean>(false)
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false)
  const [recreateKey, setRecreateKey] = useState<number>(0)
  const [message, setMessage] = useState<IMessage>()

  const navigate = useNavigate()
  const { isLoggedIn, authData, refreshLogin } = useAuthContext()

  const APIClass = new WWIIAPIBackend(authData?.token?.access_token)

  const handleFormSubmit = (data: any) => {
    handleFormClose()

    APIClass.createVeteran(data)
    .then(
      () => {
        setRecreateKey(getRandomInt(100))
      }
    )
    .catch(
      (error) => {
        handleError(error)
      }
    )
  }

  const handleFormClose = () => setShowCreationForm(false)

  const handleErrorBlockClose = () => setMessage(undefined)

  const handleLogoutModalClose = () => {
    setShowLogoutModal(false)
  }

  const handleLogoutModalConfirm = () => {
    handleLogoutModalClose()
    navigate('/logout/')
  }

  const handleError = (error: AxiosError<any>) => {
    const statusCode: number = error.response?.status || 0
    const messageText: string = error.response?.data?.detail || statusCodeMessages[statusCode.toString()]
    
    setMessage({type: 'danger', text: messageText})
    
    if (error.response?.status === 401) {
      return refreshLogin()
    }
  }

  return (
    <MainContext.Provider 
      value={{
        searchQuery,
        setSearchQuery,
        recreateKey,
        setRecreateKey,
        message,
        setMessage,
        handleError
      }}
    >
      <div className='RootWindow'>
        <nav className="navbar navbar-dark bg-dark mb-4">
          <Col className='d-flex justify-content-between align-items-center mx-3'>
            <p className="navbar-brand">WWII Frontend</p>

            <Col sm={5} className='d-flex justify-content-between p-2'>
              <InputGroup className='px-3'>
                <Form.Control
                  placeholder="Поиск..." 
                  aria-label="Search"

                  onChange={
                    ({target}) => setSearchQuery(target.value)
                  }
                  />

                </InputGroup>

                <Dropdown>
                  <Dropdown.Toggle variant={isLoggedIn ? 'outline-danger' : 'outline-secondary'}>
                    { isLoggedIn ? authData?.user?.firstName : 'Аккаунт'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    { !isLoggedIn && 
                      <>
                      <Dropdown.Item 
                        href="#"
                        onClick={() => navigate('/login/')}
                      >
                        Вход
                      </Dropdown.Item>
                      
                      <Dropdown.Item 
                        href="#"
                        onClick={() => navigate('/registration/')}
                      >
                        Регистрация
                      </Dropdown.Item>
                      </>
                    }

                    { isLoggedIn && 
                      <>
                        <Dropdown.Item 
                          href="#" 
                          onClick={() => setShowCreationForm(true)}
                        >
                          Создать ветерана
                        </Dropdown.Item>

                        <Dropdown.Item 
                          href="#" 
                          className='text-danger'
                          onClick={() => setShowLogoutModal(true)}
                        >
                          Выход
                        </Dropdown.Item>
                      </>
                    }
    
                  </Dropdown.Menu>
                </Dropdown>
            </Col>
          </Col>
        </nav>
        
        <Container>
          <SearchInfo searchQuery={searchQuery}/>

          <PersonForm asModal show={showCreationForm} handleSubmit={handleFormSubmit} handleClose={handleFormClose}/>

          <LogoutModal show={showLogoutModal} onConfirm={handleLogoutModalConfirm} onDecline={handleLogoutModalClose}/>

          <MessageAlert message={message} show={!!message} onClose={handleErrorBlockClose}/> 
          
          {children}
          
        </Container>
      </div>
    </MainContext.Provider>
  );
}

export default Main;
export {MainContext};