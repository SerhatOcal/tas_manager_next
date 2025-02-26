<?php

namespace App\Services\Contracts;

use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface TaskServiceInterface
{
    public function createTask(array $data): Task;
    public function updateTask(int $id, array $data): bool;
    public function deleteTask(int $id): bool;
    public function getMyTasks(): Collection;
    public function getTask(int $id): ?Task;

}
