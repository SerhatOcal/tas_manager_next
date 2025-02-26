<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * @return void
     */
    public function boot(): void
    {
        $this->configureRateLimiting();
    }

    /**
     * @return void
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return $request->user()
                ? Limit::perMinute(120)->by($request->user()->id)
                : Limit::perMinute(60)->by($request->ip());
        });

        RateLimiter::for('auth', function (Request $request) {
            return Limit::perMinute(1000)->by($request->ip());
        });
    }
}
