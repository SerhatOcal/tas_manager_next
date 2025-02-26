<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (ThrottleRequestsException $e, $request) {
            return Response::json([
                'success' => false,
                'message' => 'Çok Fazla Deneme Yapıldı.'. ($e->getHeaders()['Retry-After'] ? ' Lütfen '.$e->getHeaders()['Retry-After'].' saniye sonra tekrar deneyin.' : ''),
                'retry_after' => $e->getHeaders()['Retry-After'] ?? null,
                'error' => [
                    'status_code' => 429,
                    'message' => 'Rate limit exceeded',
                ],
            ], 429, $e->getHeaders());
        });
        $exceptions->renderable(function (NotFoundHttpException $e, $request) {
            return Response::json([
                'message' => 'Kayıt Bulunamadı.',
                'error' => [
                    'status_code' => 404,
                    'message' => 'Not Found',
                ],
            ], 404, $e->getHeaders());
        });

    })->create();
