<?php

namespace App\Providers;

use App\Repositories\Contracts\TaskRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository;
use App\Services\Contracts\TaskServiceInterface;
use App\Services\TaskService;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(TaskRepositoryInterface::class, TaskRepository::class);
        $this->app->bind(TaskServiceInterface::class, TaskService::class);
    }
}
