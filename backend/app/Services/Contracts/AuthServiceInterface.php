<?php

namespace App\Services\Contracts;

use App\DataObjects\LoginResult;
use App\Models\User;

interface AuthServiceInterface
{
    public function register(array $data): User;
    public function login(array $credentials): LoginResult;
    public function logout(): bool;
}
