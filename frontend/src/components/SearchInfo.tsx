import { useState, useEffect } from 'react';
import { Alert, Collapse } from 'react-bootstrap';


interface ISearchInfoProps {
    searchQuery?: string
}

const SearchInfo = ({
    searchQuery
}: ISearchInfoProps) => {
    const [animated, setAnimated] = useState<boolean>(false)

    useEffect(
        () => setAnimated(true), []
    )

    return (
        <Collapse in={animated}>
            <div className='person-list_search-info'>
                <Alert variant='danger'>
                    Найдено по результатам запроса: <code>{searchQuery}</code>
                </Alert>
            </div>
        </Collapse>
    )
}

export default SearchInfo;