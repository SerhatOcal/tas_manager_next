<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware(['throttle:api','throttle:auth'])->group(function () {
    Route::get('/', function (Request $request) {
        return response()->json(['message' => 'Welcome to the Lost and Found API']);
    });
    Route::prefix('auth')->group(function () {
        Route::post('register', RegisterController::class);
        Route::post('login', LoginController::class);
        Route::delete('logout', LogoutController::class);

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', [AuthController::class, 'logout']);
            Route::get('me', [AuthController::class, 'me']);
        });
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('tasks', TaskController::class);
        Route::get('users', [UserController::class, 'index']);
    });
});
