<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterRequest;
use App\Services\AuthService;
use Exception;
use Illuminate\Http\JsonResponse;

class RegisterController extends Controller
{
    /**
     * @var AuthService $authService
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
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function __invoke(RegisterRequest $request): JsonResponse
    {
        try {
            $this->authService->register($request->validated());
            return response()->json([
                'message' => 'Kullanıcı Başarıyla Kaydedildi'
            ], 201);
        } catch (Exception $exception) {
            return response()->json([
                'message' => 'Bir hata oluştu'
            ], 400);
        }
    }
}
