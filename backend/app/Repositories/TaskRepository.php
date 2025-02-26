<?php

namespace App\Repositories;

use App\Models\Task;
use App\Repositories\Contracts\TaskRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class TaskRepository extends BaseRepository implements TaskRepositoryInterface
{
    /**
     * @return string
     */
    protected function getModelClass(): string
    {
        return Task::class;
    }

    /**
     * @param $id
     * @return Task|null
     */
    public function getTaskUser($id): ?Task
    {
        return Task::where('id', $id)
            ->with(['user', 'assignee'])
            ->first();
    }

    /**
     * @param int $userId
     * @return Collection
     */
    public function getByUser(int $userId): Collection
    {
        return Task::with(['user', 'assignee'])
            ->where('user_id', $userId)
            ->orWhere('assigned_to', $userId)
            ->get();
    }
}
