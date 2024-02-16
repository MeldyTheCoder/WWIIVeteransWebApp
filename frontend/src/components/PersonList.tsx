import {useState, useEffect} from 'react';
import IPerson from '../interfaces/IPerson';
import { Row, Col } from 'react-bootstrap';
import PersonCard from './PersonCard';
import ErrorBlock from './ErrorBlock';
import WWIIAPIBackend from '../api/Api';
import LoadingSpinner from './LoadingSpinner';
import IPersonListProps from './types/IPersonList';
import Paginator from './Paginator';

const APIClass = new WWIIAPIBackend()


const PersonList = ({
     searchQuery
}: IPersonListProps
) => {
    const [persons, setPersons] = useState<IPerson[]>([])
    const [personsPaginated, setPersonsPaginated] = useState<IPerson[]>([])
    const [fetchedPersons, setFetchedPersons] = useState<IPerson[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)

    const fetchPersons = () => {
        setLoading(true)
    
        APIClass.getVeteransList()
        .then(
          (response) => {
            console.log(response.data)
            
            setFetchedPersons(response.data)
            setPersons(response.data)
            setLoading(false)
          }
        )
        .catch(
            (error) => {
                setLoading(false)
                console.log(error.toJSON())
            }
        )
      }
    
    const paginatePersons = (elements: any[], page: number) => {
        setPersonsPaginated(elements)
    }

    const handleSearchPersons = (query?: string): void => {
        if (!query) {
            setPersons(fetchedPersons)
            return 
        }
    
        const queryLow = query.toLowerCase()

        const personsListResult = fetchedPersons.filter(
            (person) => (
            `${person.firstName} ${person.lastName} ${person.surname && person.surname}`.toLowerCase().includes(queryLow) || 
            `${person.lastName} ${person.firstName} ${person.surname && person.surname}`.toLowerCase().includes(queryLow) || 
            `${person.surname && person.surname} ${person.firstName} ${person.lastName}`.toLowerCase().includes(queryLow)
            )
        )

        setPersons(personsListResult)
    }
    
    useEffect(
        () => fetchPersons(),
        []
    )

    useEffect(
        () => handleSearchPersons(searchQuery),
        [searchQuery]
    )

    return (
        <div className='person-list_root'>
            {!isLoading && personsPaginated && 
            <>
                <Row>
                    {personsPaginated?.map(
                        (person: IPerson, index: number) => (
                        <PersonCard {...person} key={index} onDelete={() => fetchPersons()}/>
                        )
                    )}
                </Row>
                
                <Col className='d-flex justify-content-center my-3'>
                    <Paginator elements={persons} elementsPerPage={6} onPageChange={paginatePersons} resetKey={searchQuery}/>
                </Col>
            </>
            }

            <LoadingSpinner show={isLoading}/>

            { !isLoading && (personsPaginated?.length <= 0 || persons?.length <= 0) && 
                <ErrorBlock
                    title='Ничего не найдено!'
                    description='По Вашему запросу ничего не было найдено. Попробуйте ввести что-нибудь другое :)'
                    closeble={false}
                    variant='danger'
                />
            }
        </div>
    )
}

export default PersonList