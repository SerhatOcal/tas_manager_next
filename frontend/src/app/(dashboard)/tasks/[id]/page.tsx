'use client'

import {
  Box,
  Container,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Button,
  Divider,
  Stack,
  Skeleton,
  useToast,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { taskService } from '@/services/task'
import { Task } from '@/types/task'
import { TaskStatusToggle } from '@/components/tasks/TaskStatusToggle'
import { TaskAssigneeSelect } from '@/components/tasks/TaskAssigneeSelect'

function formatDate(dateString: string | null): string {
  if (!dateString) return '-'
  
  const date = new Date(dateString)
  return date.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
export default function TaskDetailPage() {
    const params = useParams()
    const router = useRouter()
    const toast = useToast()
    const [task, setTask] = useState<Task | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const fetchTask = async () => {
        try {
            const taskId = typeof params.id === 'string' ? parseInt(params.id) : parseInt(params.id?.[0] || '0')
            
            if (taskId === 0) {
                throw new Error('Geçersiz task ID')
            }

            const data = await taskService.getById(taskId)
            setTask(data)
        } catch (error) {
            toast({
                title: 'Hata oluştu',
                description: 'Task detayları yüklenirken bir hata oluştu',
                status: 'error',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
            router.push('/tasks')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
      fetchTask()
    }, [])

    if (isLoading) {
      return (
        <Container maxW="container.md" py={6}>
          <Stack spacing={6}>
            <Skeleton height="40px" />
            <Skeleton height="20px" />
            <Skeleton height="100px" />
          </Stack>
        </Container>
      )
    }

    if (!task) {
      return null
    }

    return (
      <Container maxW="container.md" py={6}>
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          onClick={() => router.push('/tasks')}
          mb={4}
        >
          Geri Dön
        </Button>

        <Card>
          <CardHeader>
            <Heading size="lg">{task.title}</Heading>
          </CardHeader>
          
          <CardBody>
            <Stack spacing={6}>
              <Stack direction="row" spacing={4} align="center">
                <TaskStatusToggle task={task} onSuccess={fetchTask} />
                <Box flex={1}>
                  <Text color="gray.500" fontSize="sm">Atanan Kişi:</Text>
                  <TaskAssigneeSelect task={task} onSuccess={fetchTask} />
                </Box>
                <Box>
                  <Text color="gray.500" fontSize="sm">Oluşturan:</Text>
                  <Text>{task.user?.name || 'Bilinmiyor'}</Text>
                </Box>
              </Stack>

              <Divider />

              <Box>
                <Text color="gray.500" fontSize="sm" mb={2}>Açıklama</Text>
                <Text whiteSpace="pre-wrap">{task.description || 'Açıklama bulunmuyor.'}</Text>
              </Box>

              <Box>
                <Text color="gray.500" fontSize="sm" mb={2}>Bitiş Tarihi</Text>
                <Text>{formatDate(task.due_date)}</Text>
              </Box>

              <Box>
                <Text color="gray.500" fontSize="sm" mb={2}>Oluşturulma Tarihi</Text>
                <Text>{formatDate(task.created_at)}</Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Container>
    )
}