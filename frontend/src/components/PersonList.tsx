import {useState, useEffect} from 'react';
import IPerson from '../interfaces/IPerson';
import { Row } from 'react-bootstrap';
import PersonCard from './PersonCard';
import ErrorBlock from './ErrorBlock';
import WWIIAPIBackend from '../api/Api';
import LoadingSpinner from './LoadingSpinner';
import IPersonListProps from './types/IPersonList';

const APIClass = new WWIIAPIBackend()


const PersonList = ({
     searchQuery
}: IPersonListProps
) => {
    const [persons, setPersons] = useState<IPerson[]>([])
    const [fetchedPersons, setFetchedPersons] = useState<IPerson[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)

    const fetchPersons = () => {
        setLoading(true)
    
        APIClass.getVeteransList()
        .then(
          (response) => {
            setFetchedPersons(response.data)
            if (persons?.length <= 0) {
              setPersons(response.data)
            }
            setLoading(false)
          }
        )
        .catch(
            (error) => {
                setLoading(false)
                console.log(error)
            }
        )
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
            {!isLoading && persons && 
                <Row>
                    {persons?.map(
                        (person: IPerson, index: number) => (
                        <PersonCard {...person} key={index}/>
                        )
                    )}
                </Row>
            }

            <LoadingSpinner show={isLoading}/>

            { !isLoading && persons?.length <= 0 && 
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