'use client'

import {
    Box,
    Button,
    Container,
    Heading,
    Stack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useToast,
    useDisclosure,
    Link as ChakraLink,
    Card,
    CardBody,
    Spinner,
    Center,
} from '@chakra-ui/react'
import { AddIcon, EditIcon, DeleteIcon, ExternalLinkIcon, ViewIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { taskService } from '@/services/task'
import { Task } from '@/types/task'
import { CreateTaskModal } from '@/components/tasks/CreateTaskModal'
import { UpdateTaskModal } from '@/components/tasks/UpdateTaskModal'
import { DeleteTaskModal } from '@/components/tasks/DeleteTaskModal'
import { TaskStatusToggle } from '@/components/tasks/TaskStatusToggle'
import { TaskAssigneeSelect } from '@/components/tasks/TaskAssigneeSelect'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { EmptyState } from '@/components/tasks/EmptyState'

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

export default function TasksPage() {
    const router = useRouter()
    const toast = useToast()
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const createModal = useDisclosure()
    const updateModal = useDisclosure()
    const deleteModal = useDisclosure()

    const fetchTasks = async () => {
        try {
            setIsLoading(true)
            const data = await taskService.getAll()
            setTasks(data)
        } catch (error) {
            toast({
                title: 'Hata oluştu',
                description: 'Görevler yüklenirken bir hata oluştu',
                status: 'error',
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    if (isLoading) {
        return (
            <Center h="50vh">
                <Spinner size="xl" color="purple.500" />
            </Center>
        )
    }

    return (
        <Container maxW="container.xl" py={6}>
            <Stack spacing={6}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Heading size="lg">Görevler</Heading>
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme="purple"
                        onClick={createModal.onOpen}
                    >
                        Yeni Görev
                    </Button>
                </Box>

                <Card>
                    <CardBody>
                        {tasks.length === 0 ? (
                            <EmptyState onCreateClick={createModal.onOpen} />
                        ) : (
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Başlık</Th>
                                        <Th>Durum</Th>
                                        <Th>Atanan</Th>
                                        <Th>Tarih</Th>
                                        <Th width="150px">İşlemler</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {tasks.map((task) => (
                                        <Tr key={task.id}>
                                            <Td>
                                                <ChakraLink
                                                    as={Link}
                                                    href={`/tasks/${task.id}`}
                                                    color="purple.600"
                                                    _hover={{ textDecoration: 'underline' }}
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    {task.title}
                                                    <ExternalLinkIcon ml={2} boxSize={3} />
                                                </ChakraLink>
                                            </Td>
                                            <Td>
                                                <TaskStatusToggle
                                                    task={task}
                                                    onSuccess={fetchTasks}
                                                />
                                            </Td>
                                            <Td>
                                                <TaskAssigneeSelect
                                                    task={task}
                                                    onSuccess={fetchTasks}
                                                />
                                            </Td>
                                            <Td>{formatDate(task.due_date)}</Td>
                                            <Td>
                                                <Stack direction="row" spacing={2}>
                                                    <IconButton
                                                        aria-label="View"
                                                        icon={<ViewIcon />}
                                                        size="sm"
                                                        colorScheme="blue"
                                                        onClick={() => router.push(`/tasks/${task.id}`)}
                                                    />
                                                    <IconButton
                                                        aria-label="Edit"
                                                        icon={<EditIcon />}
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedTask(task)
                                                            updateModal.onOpen()
                                                        }}
                                                    />
                                                    <IconButton
                                                        aria-label="Delete"
                                                        icon={<DeleteIcon />}
                                                        size="sm"
                                                        colorScheme="red"
                                                        onClick={() => {
                                                            setTaskToDelete(task)
                                                            deleteModal.onOpen()
                                                        }}
                                                    />
                                                </Stack>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        )}
                    </CardBody>
                </Card>
            </Stack>

            <CreateTaskModal
                isOpen={createModal.isOpen}
                onClose={createModal.onClose}
                onSuccess={fetchTasks}
            />

            {selectedTask && (
                <UpdateTaskModal
                    isOpen={updateModal.isOpen}
                    onClose={() => {
                        updateModal.onClose()
                        setSelectedTask(null)
                    }}
                    task={selectedTask}
                    onSuccess={fetchTasks}
                />
            )}

            {taskToDelete && (
                <DeleteTaskModal
                    isOpen={deleteModal.isOpen}
                    onClose={() => {
                        deleteModal.onClose()
                        setTaskToDelete(null)
                    }}
                    onSuccess={fetchTasks}
                    taskId={taskToDelete.id}
                    taskTitle={taskToDelete.title}
                />
            )}
        </Container>
    )
} 