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
import { authService } from '@/services/auth'
import { AxiosError } from 'axios'

interface ValidationErrors {
  [key: string]: string[]
}

export default function RegisterPage() {
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      await authService.register(formData)
      
      toast({
        title: 'Kayıt başarılı',
        description: 'Giriş yapabilirsiniz',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      })
      
      router.push('/login')
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.errors) {
        setErrors(error.response.data.errors)
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
              <Heading size="lg">Kayıt Ol</Heading>
            </Stack>

            <Box as="form" onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired isInvalid={!!errors.name}>
                  <FormLabel>Ad Soyad</FormLabel>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name[0]}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.email}>
                  <FormLabel>E-posta</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password[0]}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.password_confirmation}>
                  <FormLabel>Şifre Tekrar</FormLabel>
                  <Input
                    type="password"
                    value={formData.password_confirmation}
                    onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                  />
                  <FormErrorMessage>
                    {errors.password_confirmation && errors.password_confirmation[0]}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="purple"
                  size="lg"
                  fontSize="md"
                  isLoading={isLoading}
                >
                  Kayıt Ol
                </Button>
              </Stack>
            </Box>

            <Text align="center">
              Zaten hesabınız var mı?{' '}
              <Link href="/login">
                <Text as="span" color="purple.500">
                  Giriş Yap
                </Text>
              </Link>
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Container>
  )
} 