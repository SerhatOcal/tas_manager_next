<?php

namespace App\Services;

use App\DataObjects\LoginResult;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\Contracts\AuthServiceInterface;
use App\Traits\WithTransaction;
use Exception;
use Illuminate\Support\Facades\Auth;

class AuthService implements AuthServiceInterface
{
    use WithTransaction;

    /**
     * @var UserRepositoryInterface $repository
     */
    protected UserRepositoryInterface $repository;

    /**
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->repository = $userRepository;
    }

    /**
     * @throws Exception
     */
    public function register(array $data): User
    {
        return $this->transaction(function () use ($data) {
            return $this->repository->create($data);
        });
    }

    /**
     * @param array $credentials
     * @return LoginResult
     */
    public function login(array $credentials): LoginResult
    {
        if (!Auth::attempt($credentials)) {
           return new LoginResult(
               success: false,
                message: 'Giriş başarısız'
           );
        }

        $user = Auth::user();
        $user->tokens->each(function ($token) {
            $token->delete();
        });
        $token = $user->createToken('auth_token')->plainTextToken;

        return new LoginResult(
            success: true,
            user: $user,
            token: $token,
            message: 'Giriş başarılı'
        );
    }

    /**
     * @return bool
     */
    public function logout(): bool
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return false;
            }

            $user->tokens->each(function ($token) {
                $token->delete();
            });

            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
