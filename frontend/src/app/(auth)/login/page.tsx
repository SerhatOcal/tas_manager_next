'use client'

import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useToast,
    Card,
    CardBody,
    FormErrorMessage,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { AxiosError } from 'axios'

interface ValidationErrors {
    [key: string]: string[]
}

export default function LoginPage() {
    const router = useRouter()
    const toast = useToast()
    const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<ValidationErrors>({})
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})

        try {
            await login(formData.email, formData.password)
            
            toast({
                title: 'Giriş başarılı',
                status: 'success',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })

            router.push('/tasks')
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.data.errors) {
                    setErrors(error.response.data.errors)
                } else {
                    toast({
                        title: 'Hata oluştu',
                        description: error.response?.data.message || 'Bir hata oluştu, lütfen tekrar deneyin',
                        status: 'error',
                        duration: 2000,
                        position: 'top-right',
                        isClosable: true,
                    })
                }
            } else {
                toast({
                    title: 'Hata oluştu',
                    description: 'Bir hata oluştu, lütfen tekrar deneyin',
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
        <Container maxW="md">
            <Card>
                <CardBody>
                    <Stack spacing={8}>
                        <Stack align="center">
                            <Heading size="lg">Giriş Yap</Heading>
                        </Stack>

                        <Box as="form" onSubmit={handleSubmit}>
                            <Stack spacing={4}>
                                <FormControl isRequired isInvalid={!!errors.email}>
                                    <FormLabel>E-posta</FormLabel>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                    <FormErrorMessage>
                                        {errors.email && errors.email[0]}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={!!errors.password}>
                                    <FormLabel>Şifre</FormLabel>
                                    <Input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                    <FormErrorMessage>
                                        {errors.password && errors.password[0]}
                                    </FormErrorMessage>
                                </FormControl>

                                <Button
                                    type="submit"
                                    colorScheme="purple"
                                    size="lg"
                                    fontSize="md"
                                    isLoading={isLoading}
                                >
                                    Giriş Yap
                                </Button>
                            </Stack>
                        </Box>

                        <Text align="center">
                            Hesabınız yok mu?{' '}
                            <Link href="/register">
                                <Text as="span" color="purple.500">
                                    Kayıt Ol
                                </Text>
                            </Link>
                        </Text>
                    </Stack>
                </CardBody>
            </Card>
        </Container>
    )
} 