'use client'

import { 
    Badge, 
    Switch,
    HStack,
    Text,
    useToast 
} from '@chakra-ui/react'
import { useState } from 'react'
import { taskService } from '@/services/task'
import { Task } from '@/types/task'

interface Props {
    task: Task
    onSuccess: () => void
}

export function TaskStatusToggle({ task, onSuccess }: Props) {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'completed':
                return 'green'
            case 'pending':
                return 'yellow'
            default:
                return 'gray'
        }
    }

    const getStatusText = (status: string): string => {
        switch (status) {
            case 'completed':
                return 'Tamamlandı'
            case 'pending':
                return 'Bekliyor'
            default:
                return 'Bilinmiyor'
        }
    }

    const handleToggle = async () => {
        setIsLoading(true)
        try {
            const newStatus = task.status === 'completed' ? 'pending' : 'completed'
            await taskService.update(task.id, { 
                status: newStatus,
                title: task.title
            })
            onSuccess()
        } catch (error) {
            toast({
                title: 'Hata oluştu',
                description: 'Durum güncellenirken bir hata oluştu',
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
        <HStack spacing={2}>
            <Switch
                size="sm"
                colorScheme="green"
                isChecked={task.status === 'completed'}
                onChange={handleToggle}
                isDisabled={isLoading}
            />
            <Badge colorScheme={getStatusColor(task.status)}>
                {getStatusText(task.status)}
            </Badge>
        </HStack>
    )
} 