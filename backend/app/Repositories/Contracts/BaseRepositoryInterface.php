<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface BaseRepositoryInterface
{
    /**
     * @return Collection
     */
    public function all(): Collection;

    /**
     * @param int $id
     * @return Model
     */
    public function findById(int $id): Model;

    /**
     * @param string $column
     * @param string $value
     * @return Model
     */
    public function findBy(string $column, string $value): Model;

    /**
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model;

    /**
     * @param Model $model
     * @param array $data
     * @return bool
     */
    public function update(Model $model, array $data): bool;

    /**
     * @param Model $model
     * @return bool
     */
    public function delete(Model $model): bool;
}
