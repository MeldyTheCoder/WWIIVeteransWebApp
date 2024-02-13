import { useState } from 'react';
import { Container, Col, Form, Button, InputGroup } from 'react-bootstrap';
import WWIIAPIBackend from './api/Api';
import PersonList from './components/PersonList';
import PersonForm from './components/PersonForm';
import SearchInfo from './components/SearchInfo';


import './components/styles/App.css';


const APIClass = new WWIIAPIBackend()


function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}


function App() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showCreationForm, setShowCreationForm] = useState<boolean>(false)
  const [recreateKey, setRecreateKey] = useState<number>(0)

  const handleFormSubmit = (data: any) => {
    handleFormClose()

    APIClass.createVeteran(
      data
    )
    .then(
      () => {
        setRecreateKey(getRandomInt(100))
      }
    )
    .catch(
      (error) => console.log(error)
    )
  }

  const handleFormClose = () => setShowCreationForm(false)

  return (
    <div className='RootWindow'>
      <nav className="navbar navbar-dark bg-dark mb-4">
        <Col className='d-flex justify-content-between align-items-center mx-3'>
          <p className="navbar-brand">WWII Frontend</p>

          <Col sm={4} className='d-flex justify-content-between p-2'>
            <InputGroup>
              <Form.Control
                placeholder="Поиск..." 
                aria-label="Search"

                onChange={
                  ({target}) => setSearchQuery(target.value)
                }
                />
                <Button 
                  variant='success'
                  onClick={() => setShowCreationForm(!showCreationForm)}
                >
                  Создать
                </Button>
              </InputGroup>
          </Col>
        </Col>
      </nav>
      
      <Container>
        { !!searchQuery && 
          <SearchInfo searchQuery={searchQuery}/>
        }

        { showCreationForm && 
          <PersonForm asModal show={showCreationForm} handleSubmit={handleFormSubmit} handleClose={handleFormClose}/>
        }

        <PersonList searchQuery={searchQuery} key={recreateKey}/>
      </Container>
    </div>
  );
}

export default App;
