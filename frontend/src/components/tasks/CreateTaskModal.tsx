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
    useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { taskService } from '@/services/task'
import { CreateTaskData } from '@/types/task'

interface Props {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export function CreateTaskModal({ isOpen, onClose, onSuccess }: Props) {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<CreateTaskData>({
        title: '',
        description: '',
        status: 'pending',
        due_date: '',
    })

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            await taskService.create(formData)
            
            toast({
                title: 'Başarılı',
                description: 'Görev başarıyla oluşturuldu',
                status: 'success',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
            
            onSuccess()
            onClose()
            setFormData({
                title: '',
                description: '',
                status: 'pending',
                due_date: '',
            })
        } catch (error) {
            toast({
                title: 'Hata oluştu',
                description: 'Görev oluşturulurken bir hata oluştu',
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
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Yeni Görev</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Başlık</FormLabel>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Açıklama</FormLabel>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Durum</FormLabel>
                            <Select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'completed' })}
                            >
                                <option value="pending">Bekliyor</option>
                                <option value="completed">Tamamlandı</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Bitiş Tarihi</FormLabel>
                            <Input
                                type="datetime-local"
                                value={formData.due_date}
                                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                            />
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
                        Oluştur
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
} 