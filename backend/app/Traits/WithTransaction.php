<?php

namespace App\Traits;

use Closure;
use Exception;
use Illuminate\Support\Facades\DB;

trait WithTransaction
{
    protected function transaction(Closure $callback)
    {
        try {
            DB::beginTransaction();
            $result = $callback();
            DB::commit();
            return $result;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
