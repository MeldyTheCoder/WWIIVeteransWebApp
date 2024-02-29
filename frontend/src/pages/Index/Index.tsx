import PersonList from '../../components/PersonList/PersonList';
import { useMainContext } from "../../contexts/MainContext";


const Index = () => {
    const { searchQuery, recreateKey } = useMainContext()

    return (
        <>
            <PersonList searchQuery={searchQuery} key={recreateKey}/>
        </>
    )
}

export default Index