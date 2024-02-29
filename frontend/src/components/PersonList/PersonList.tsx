import {useState, useEffect} from 'react';
import IPerson from '../../interfaces/IPerson';
import { Row, Col } from 'react-bootstrap';
import PersonCard from '../PersonCard/PersonCard';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import WWIIAPIBackend from '../../api/Api';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import IPersonListProps from './IPersonList';
import Paginator from '../Paginator/Paginator';
import { useAuthContext } from '../../contexts/AuthContext';
import { useMainContext } from '../../contexts/MainContext';

const PersonList = ({
     searchQuery,
     maxElements
}: IPersonListProps
) => {
    const [persons, setPersons] = useState<IPerson[]>([])
    const [personsPaginated, setPersonsPaginated] = useState<IPerson[]>([])
    const [fetchedPersons, setFetchedPersons] = useState<IPerson[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)

    const { handleError } = useMainContext()
    const { authData } = useAuthContext()

    
    const APIClass = new WWIIAPIBackend(authData?.token?.access_token)
    
    const randomElements = (array: any[], count: number): any[] => {
        const elements: any[] = []
        
        if (array.length <= count) {
            return array
        }
        
        for (let i = 0; i < count; i++) {
            elements.push(
                array[
                    Math.floor((Math.random() * array.length))
                ])
        }

        const result = [...(new Set(elements))]
        
        if (result.length < count) {
            return randomElements(array, count)
        }

        return result

    }

    const fetchPersons = () => {
        setLoading(true)
    
        APIClass.getVeteransList()
        .then(
          (response) => {
            setFetchedPersons(response.data)
            setLoading(false)

            if (maxElements && maxElements > 0) {
                setPersons(randomElements(response.data, maxElements))
            } else {
                setPersons(response.data)
            }
          }
        )
        .catch(
            (error) => {
                setLoading(false)
                handleError?.(error)
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