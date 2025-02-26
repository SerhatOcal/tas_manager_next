'use client'

import {
  Box,
  Container,
  HStack,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Flex,
  Avatar,
  Text,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const toast = useToast()

  const handleLogout = async () => {
    try {
      await logout()
      
      toast({
        title: 'Çıkış başarılı!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      })
      
      router.push('/login')
    } catch (error) {
      toast({
        title: 'Hata oluştu',
        description: 'Çıkış yapılırken bir hata oluştu',
        status: 'error',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      })
    }
  }

  return (
    <Box bg="white" py={4} borderBottom="1px" borderColor="gray.200">
      <Container maxW="container.xl">
        <HStack justify="space-between">
          <Link href="/tasks">
            <Heading size="md" color="gray.700">Laravel</Heading>
          </Link>

          <HStack spacing={4}>
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                rightIcon={<ChevronDownIcon />}
                color="gray.600"
              >
                <Flex alignItems="center">
                  <Avatar
                    size="sm"
                    name={user?.name}
                    mr={2}
                  />
                  <Text>{user?.name || 'Kullanıcı'}</Text>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
} 