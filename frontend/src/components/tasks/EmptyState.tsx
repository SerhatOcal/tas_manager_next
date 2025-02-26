import {
    Box,
    Stack,
    Heading,
    Text,
    Button,
    Icon,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

interface EmptyStateProps {
    onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
    return (
        <Box
            p={8}
            textAlign="center"
            bg="white"
            borderRadius="lg"
            shadow="sm"
        >
            <Stack spacing={4} alignItems="center">
                <Icon as={AddIcon} boxSize={12} color="gray.400" />
                <Stack spacing={2}>
                    <Heading size="md">Henüz hiç task yok</Heading>
                    <Text color="gray.500">
                        Yeni bir task oluşturarak başlayabilirsiniz.
                    </Text>
                </Stack>
                <Button
                    colorScheme="purple"
                    onClick={onCreateClick}
                >
                    Yeni Task Oluştur
                </Button>
            </Stack>
        </Box>
    )
} 