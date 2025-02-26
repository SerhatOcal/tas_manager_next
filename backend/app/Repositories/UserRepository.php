<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    /**
     * @return string
     */
    protected function getModelClass(): string
    {
        return User::class;
    }
}
