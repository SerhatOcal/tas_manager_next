import api from './api'
import { API_ENDPOINTS } from '@/config/api'

interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface User {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  message?: string
}

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data)
    return response.data
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password })
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    }
    
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.delete(API_ENDPOINTS.AUTH.LOGOUT)
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  },

  loadToken: () => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }
} 