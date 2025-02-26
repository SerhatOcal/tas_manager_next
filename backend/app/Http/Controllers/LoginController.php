<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use Exception;
use Illuminate\Http\JsonResponse;

class LoginController extends Controller
{
    /**
     * @var AuthService
     */
    protected AuthService $authService;

    /**
     * @param AuthService $authService
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function __invoke(LoginRequest $request): JsonResponse
    {
        try {
            $result = $this->authService->login($request->validated());
            return response()->json($result, 200);
        } catch (Exception $exception) {
            return response()->json([
                'message' => 'Bir hata oluştu'
            ], 400);
        }
    }
}
