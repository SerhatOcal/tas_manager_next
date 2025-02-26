'use client'

import { Select, FormControl, useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { taskService } from '@/services/task'
import { userService, User } from '@/services/user'
import { Task, UpdateTaskData } from '@/types/task'

interface Props {
    task: Task
    onSuccess: () => void
}

export function TaskAssigneeSelect({ task, onSuccess }: Props) {
    const toast = useToast()
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const data = await userService.getAll()
            setUsers(data)
        } catch (error) {
            toast({
                title: 'Hata oluştu',
                description: 'Kullanıcılar yüklenirken bir hata oluştu',
                status: 'error',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
        }
    }

    const handleChange = async (userId: string) => {
        setIsLoading(true)
        try {
            const updateData: UpdateTaskData = {
                assigned_to: userId ? parseInt(userId) : undefined,
                title: task.title,
                status: task.status
            }

            await taskService.update(task.id, updateData)
            onSuccess()
        } catch (error) {
            toast({
                title: 'Hata oluştu',
                description: 'Görev ataması yapılırken bir hata oluştu',
                status: 'error',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <FormControl>
            <Select
                value={task.assigned_to?.toString() || ''}
                onChange={(e) => handleChange(e.target.value)}
                isDisabled={isLoading}
                placeholder="Atanmadı"
                size="sm"
            >
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </Select>
        </FormControl>
    )
} 