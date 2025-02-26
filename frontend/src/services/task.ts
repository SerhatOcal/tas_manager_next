import api from './api'
import { API_ENDPOINTS } from '@/config/api'
import { Task, CreateTaskData, UpdateTaskData } from '@/types/task'

export const taskService = {
    getAll: async (): Promise<Task[]> => {
        const response = await api.get(API_ENDPOINTS.TASKS.LIST)
        return response.data
    },

    create: async (data: CreateTaskData): Promise<Task> => {
        const response = await api.post(API_ENDPOINTS.TASKS.CREATE, data)
        return response.data.task
    },

    update: async (id: number, data: UpdateTaskData): Promise<Task> => {
        const response = await api.put(API_ENDPOINTS.TASKS.UPDATE(id), data)
        return response.data.task
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(API_ENDPOINTS.TASKS.DELETE(id))
    },

    getById: async (id: number): Promise<Task> => {
        const response = await api.get(`${API_ENDPOINTS.TASKS.DETAIL(id)}`)
        return response.data
    },
} 