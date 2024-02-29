import { useNavigate } from "react-router-dom";
import AuthContext, { IAuthContext, IAuthData } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Fade } from "react-bootstrap";
import WWIIAPIBackend from "../api/Api";



const AuthProvider = ({children}: {children: JSX.Element}) => {
    const navigate = useNavigate()

    const getFromLocalStorage = (): IAuthData | undefined => {
        const localStorageData = localStorage.getItem('auth')
        
        if (!localStorageData) {
            return undefined
        }

        return JSON.parse(localStorageData)
    }

    const setToLocalStorage = (data: IAuthData) => {
        localStorage.setItem('auth', JSON.stringify(data))
    }

    const clearLocalStorage = () => {
        localStorage.removeItem('auth')
    }

    const authenticate = (data: IAuthData) => {
        const token = data.token?.access_token
        const user = data.user

        if (!token || !user) {
            return clearLocalStorage()
        }

        setToLocalStorage(data)
    }

    const login = () => {
        const localData = getFromLocalStorage()

        if (!localData) {
            navigate('/login')
        }
    }

    const refreshLogin = () => {
        clearLocalStorage()
        navigate('/login/')
    }

    const logout = () => {
        clearLocalStorage()
        navigate('/')
    }

    useEffect(
        () => {
            const localData = getFromLocalStorage()
            
            if (localData) {
                authenticate(localData)
            }

            if (localData) {
                const API = new WWIIAPIBackend(localData?.token?.access_token)

                API.getMe()
                .catch(
                    (error) => (
                        error.response?.status === 401 
                        && logout()
                    )
                )
            }
        }, []
    )
    
    return (
        <AuthContext.Provider value={{authData: getFromLocalStorage(), login, logout, authenticate, isLoggedIn: !!getFromLocalStorage(), refreshLogin}}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthProvider