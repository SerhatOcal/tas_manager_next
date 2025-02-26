'use client'

import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
    const router = useRouter()
    const bgColor = useColorModeValue('gray.50', 'gray.900')

    return (
        <Box bg={bgColor} minH="100vh">
            <Container maxW="container.xl" py={20}>
                <Stack spacing={8} alignItems="center" textAlign="center">
                    <Heading size="2xl" color="purple.600">
                        Task Manager
                    </Heading>
                    <Text fontSize="xl" color="gray.600">
                        Next.js + Chakra UI ile hazırlanmıştır.
                    </Text>
                    <Button
                        size="lg"
                        colorScheme="purple"
                        onClick={() => router.push('/tasks')}
                    >
                        Görevleri Görüntüle
                    </Button>
                </Stack>
            </Container>
        </Box>
    )
}
