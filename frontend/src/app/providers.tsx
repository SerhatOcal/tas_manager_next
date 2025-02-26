'use client'

import { ChakraProvider, ColorModeScript, ToastProviderProps } from '@chakra-ui/react'
import { theme } from '@/theme'
import React, { useEffect, useState } from 'react'
import { authService } from '@/services/auth'
import { AuthProvider } from '@/contexts/AuthContext'

const toastOptions: ToastProviderProps = {
  defaultOptions: {
    position: 'top-right',
    duration: 2000,
    isClosable: true,
  },
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    authService.loadToken()
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ChakraProvider>
  )
} 