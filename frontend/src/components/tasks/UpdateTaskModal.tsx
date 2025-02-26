'use client'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Stack,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { taskService } from '@/services/task'
import { Task, UpdateTaskData } from '@/types/task'
import { AxiosError } from 'axios'

interface Props {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    task: Task
}

interface ValidationErrors {
    [key: string]: string[]
}

function formatDateForInput(dateString: string | null): string {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toISOString().slice(0, 16)
}

export function UpdateTaskModal({ isOpen, onClose, onSuccess, task }: Props) {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<ValidationErrors>({})
    const [formData, setFormData] = useState<UpdateTaskData>({
        title: task.title,
        description: task.description || '',
        status: task.status,
        due_date: formatDateForInput(task.due_date),
    })

    useEffect(() => {
        if (isOpen) {
            setFormData({
                title: task.title,
                description: task.description || '',
                status: task.status,
                due_date: formatDateForInput(task.due_date),
            })
            setErrors({})
        }
    }, [isOpen, task])

    const handleSubmit = async () => {
        setIsLoading(true)
        setErrors({})

        try {
            await taskService.update(task.id, formData)
            
            toast({
                title: 'Başarılı',
                description: 'Görev başarıyla güncellendi',
                status: 'success',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
            
            onSuccess()
            onClose()
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data.errors) {
                setErrors(error.response.data.errors)
            } else {
                toast({
                    title: 'Hata oluştu',
                    description: 'Görev güncellenirken bir hata oluştu',
                    status: 'error',
                    duration: 2000,
                    position: 'top-right',
                    isClosable: true,
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Görevi Düzenle</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <FormControl isRequired isInvalid={!!errors.title}>
                            <FormLabel>Başlık</FormLabel>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <FormErrorMessage>
                                {errors.title && errors.title[0]}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.description}>
                            <FormLabel>Açıklama</FormLabel>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <FormErrorMessage>
                                {errors.description && errors.description[0]}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.status}>
                            <FormLabel>Durum</FormLabel>
                            <Select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'completed' })}
                            >
                                <option value="pending">Bekliyor</option>
                                <option value="completed">Tamamlandı</option>
                            </Select>
                            <FormErrorMessage>
                                {errors.status && errors.status[0]}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.due_date}>
                            <FormLabel>Bitiş Tarihi</FormLabel>
                            <Input
                                type="datetime-local"
                                value={formData.due_date}
                                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                            />
                            <FormErrorMessage>
                                {errors.due_date && errors.due_date[0]}
                            </FormErrorMessage>
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        İptal
                    </Button>
                    <Button
                        colorScheme="purple"
                        onClick={handleSubmit}
                        isLoading={isLoading}
                    >
                        Güncelle
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
} 