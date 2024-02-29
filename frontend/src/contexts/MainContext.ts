import { AxiosError } from 'axios';
import { IMessage } from '../components/MessageAlert/IMessageAlert';
import { useContext, createContext } from 'react';


interface IContext {
    searchQuery?: string
    recreateKey?: any
    message?: IMessage

    setMessage?: (value: IMessage | undefined) => void
    setRecreateKey?: (value: any) => void
    setSearchQuery?: (value: string) => void
    handleError?: (error: AxiosError<any>) => void
}

const MainContext = createContext<IContext>(
    {}
)


const useMainContext = () => {
    const context = useContext(MainContext)

    if (!context) {
        throw new Error(
            'Данный контекст должен быть вызван внутри провайдера MainContext'
        )
    }

    return context
}

export default MainContext
export {useMainContext}
export type {IContext}