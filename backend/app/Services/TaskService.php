<?php

namespace App\Services;

use App\Models\Task;
use App\Repositories\Contracts\TaskRepositoryInterface;
use App\Services\Contracts\TaskServiceInterface;
use App\Traits\WithTransaction;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class TaskService implements TaskServiceInterface
{
    use WithTransaction;

    /**
     * @var TaskRepositoryInterface $repository
     */
    protected TaskRepositoryInterface $repository;

    /**
     * @param TaskRepositoryInterface $taskRepository
     */
    public function __construct(TaskRepositoryInterface $taskRepository)
    {
        $this->repository = $taskRepository;
    }

    /**
     * @param array $data
     * @return Task
     * @throws Exception
     */
    public function createTask(array $data): Task
    {
        return $this->transaction(function () use ($data) {
            $data['user_id'] = Auth::id();
            return $this->repository->create($data);
        });
    }

    /**
     * @param int $id
     * @param array $data
     * @return boolean
     * @throws Exception
     */
    public function updateTask(int $id, array $data): bool
    {
        return $this->transaction(function () use ($id, $data) {
            $task = $this->repository->findById($id);
            if (!$task || !$task->can_manage) {
                throw new Exception('Göre bulunamadı yada yetkisiz işlem');
            }

            return $this->repository->update($task, $data);
        });
    }

    /**
     * @param int $id
     * @return bool
     * @throws Exception
     */
    public function deleteTask(int $id): bool
    {
        return $this->transaction(function () use ($id) {
            $task = $this->repository->findById($id);

            if (!$task || !$task->can_manage) {
                throw new Exception('Task not found or unauthorized');
            }

            return $this->repository->delete($task);
        });
    }

    /**
     * @return Collection
     */
    public function getMyTasks(): Collection
    {
        return $this->repository->getByUser(Auth::id());
    }

    /**
     * @param int $id
     * @return Task|null
     */
    public function getTask(int $id): ?Task
    {
        return $this->repository->getTaskUser($id);
    }
}
