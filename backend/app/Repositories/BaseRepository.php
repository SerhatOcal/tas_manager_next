<?php

namespace App\Repositories;

use App\Repositories\Contracts\BaseRepositoryInterface;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

abstract class BaseRepository implements BaseRepositoryInterface
{
    /**
     * @var mixed
     */
    protected Model $model;

    /**
     * @throws BindingResolutionException
     */
    public function __construct()
    {
        $this->setModel();
    }

    /**
     * @return string
     */
    abstract protected function getModelClass(): string;

    /**
     * @throws BindingResolutionException
     */
    protected function setModel(): void
    {
        $this->model = app()->make($this->getModelClass());
    }

    /**
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->model->all();
    }

    /**
     * @param int $id
     * @return Model
     */
    public function findById(int $id): Model
    {
        return $this->model->findOrFail($id);
    }

    /**
     * @param string $column
     * @param string $value
     * @return Model
     */
    public function findBy(string $column, string $value): Model
    {
        return $this->model->where($column, $value)->firstOrFail();
    }

    /**
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    /**
     * @param Model $model
     * @param array $data
     * @return bool
     */
    public function update(Model $model, array $data): bool
    {
        return $model->update($data);
    }

    /**
     * @param Model $model
     * @return bool
     */
    public function delete(Model $model): bool
    {
        return $model->delete();
    }
}
