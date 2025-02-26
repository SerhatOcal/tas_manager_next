<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
class LogoutController extends Controller
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
     * @return JsonResponse
     */
    public function __invoke(): JsonResponse
    {
        $this->authService->logout();
        return response()->json([
            'message' => 'Çıkış yapıldı'
        ], 200);
    }
}
