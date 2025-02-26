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
    Text,
    useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { taskService } from '@/services/task'

interface Props {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    taskId: number
    taskTitle: string
}

export function DeleteTaskModal({ isOpen, onClose, onSuccess, taskId, taskTitle }: Props) {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            await taskService.delete(taskId)
            
            toast({
                title: 'Başarılı',
                description: 'Görev başarıyla silindi',
                status: 'success',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
            
            onSuccess()
            onClose()
        } catch (error) {
            toast({
                title: 'Hata oluştu',
                description: 'Görev silinirken bir hata oluştu',
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
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Görevi Sil</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        <strong>{taskTitle}</strong> başlıklı görevi silmek istediğinize emin misiniz?
                    </Text>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        İptal
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={handleDelete}
                        isLoading={isLoading}
                    >
                        Sil
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
} 