'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Spinner, Center } from '@chakra-ui/react'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!isLoading && !isAuthenticated && pathname !== '/login') {
            router.push('/login')
        }
    }, [isAuthenticated, isLoading, router, pathname])

    if (isLoading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" color="purple.500" />
            </Center>
        )
    }

    return isAuthenticated ? children : null
} 