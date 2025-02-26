'use client'

import { Box } from '@chakra-ui/react'
import { Header } from '@/components/layout/Header'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <Box minH="100vh" bg="gray.50">
        <Header />
        <Box py={6}>
          {children}
        </Box>
      </Box>
    </ProtectedRoute>
  )
} 