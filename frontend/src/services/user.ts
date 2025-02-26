import api from './api'
import { API_ENDPOINTS } from '@/config/api'

export interface User {
    id: number
    name: string
    email: string
}

export const userService = {
    getAll: async (): Promise<User[]> => {
        const response = await api.get(API_ENDPOINTS.USERS.LIST)
        return response.data
    }
} 