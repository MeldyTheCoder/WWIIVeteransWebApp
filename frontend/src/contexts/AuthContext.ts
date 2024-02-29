import { createContext, useContext } from 'react';
import { UserResponse, AccessTokenResponse } from '../api/Types';


const pass = 'pass'

interface IAuthData {
    user?: UserResponse
    token?: AccessTokenResponse
}


interface IAuthContext {
    login: () => any | void 
    logout: () => any | void
    authenticate: (data: IAuthData) => any | void
    refreshLogin: () => any | void
    isLoggedIn: boolean
    authData?: IAuthData
}


const AuthContext = createContext<IAuthContext>({
    login: () => pass,
    logout: () => pass,
    authenticate: (data: IAuthData) => data,
    refreshLogin: () => pass,
    isLoggedIn: false
})


const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error(
            'Данный метод должен быть вызван внутри AuthProvider'
        )
    }

    return context
}


export default AuthContext
export { useAuthContext }
export type { IAuthContext, IAuthData }