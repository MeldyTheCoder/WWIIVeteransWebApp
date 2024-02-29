import { Alert, Collapse } from 'react-bootstrap';
import ISearchInfoProps from './ISearchInfo';


const SearchInfo = ({
    searchQuery
}: ISearchInfoProps) => {

    return (
        <Collapse in={!!searchQuery}>
            <div className='person-list_search-info'>
                <Alert variant='danger'>
                    <b>Найдено по результатам запроса:</b> <span className='px-1'>{searchQuery}</span>
                </Alert>
            </div>
        </Collapse>
    )
}

export default SearchInfo;