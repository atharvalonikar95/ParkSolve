import React from 'react'
import { fetchUser } from '../services/authService'

const authContext = React.createContext()
export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    const getCurrUser = async () => {
        try {
            const userData = await fetchUser()
            setUser(userData)
        } catch (error) {
            console.error("Failed to fetch user:", error)
        }
        finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        getCurrUser()
    }, [])

    return (
        <authContext.Provider value={{ user,setUser, loading,getCurrUser }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => React.useContext(authContext)