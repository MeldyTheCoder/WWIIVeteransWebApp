import { useState, useEffect } from 'react';
import { Alert, Collapse } from 'react-bootstrap';
import ISearchInfoProps from './types/ISearchInfo';


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
                    <b>Найдено по результатам запроса:</b> <span className='px-1'>{searchQuery}</span>
                </Alert>
            </div>
        </Collapse>
    )
}

export default SearchInfo;