<?php

namespace App\DataObjects;

use App\Models\User;

readonly class LoginResult
{
    public function __construct(
        public bool $success,
        public ?User $user = null,
        public ?string $token = null,
        public ?string $message = null
    ) {}
}
