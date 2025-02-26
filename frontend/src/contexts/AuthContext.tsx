import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { authService } from '@/services/auth'
import { useToast } from '@chakra-ui/react'

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: async () => {},
    logout: async () => {},
    isLoading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
    const toast = useToast()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            authService.loadToken()
            setIsAuthenticated(true)
        }
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        const response = await authService.login(email, password)
        if (response.success && response.user) {
            setUser(response.user)
            setIsAuthenticated(true)
        } else {
            throw new Error(response.message || 'Login failed')
        }
    }

    const logout = async () => {
        try {
            await authService.logout()
            setUser(null)
            setIsAuthenticated(false)
        } catch (error) {
            toast({
                title: 'Hata oluştu',
                description: 'Çıkış yapılırken bir hata oluştu',
                status: 'error',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext) 