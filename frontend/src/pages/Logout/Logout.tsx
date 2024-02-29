import { useEffect } from "react"
import { useAuthContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"


const Logout = () => {
    const navigate = useNavigate()
    const { logout, isLoggedIn } = useAuthContext()

    useEffect(
        () => {
            if (!isLoggedIn) {
                return navigate('/')
            }

            logout()
        },
        []
    )

    return null
}

export default Logout