<?php

namespace App\Repositories\Contracts;

use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface TaskRepositoryInterface
{
    public function getByUser(int $userId): Collection;
}
