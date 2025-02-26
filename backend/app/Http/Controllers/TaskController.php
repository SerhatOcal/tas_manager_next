<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\TaskCreateRequest;
use App\Http\Requests\Task\TaskUpdateRequest;
use App\Http\Resources\TaskResource;
use App\Services\Contracts\TaskServiceInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TaskController extends Controller
{
    /**
     * @var TaskServiceInterface
     */
    protected TaskServiceInterface $taskService;

    /**
     * @param TaskServiceInterface $taskService
     */
    public function __construct(TaskServiceInterface $taskService)
    {
        $this->taskService = $taskService;
    }

    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $tasks = $this->taskService->getMyTasks();
        return response()->json($tasks);
    }

    /**
     * @param TaskCreateRequest $request
     * @return JsonResponse
     */
    public function store(TaskCreateRequest $request): JsonResponse
    {
        try {
            $task = $this->taskService->createTask($request->validated());

            return response()->json([
                'message' => 'Görev başarıyla oluşturuldu',
                'task' => $task
            ], Response::HTTP_CREATED);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Görev oluşturulurken bir hata oluştu'
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param TaskUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(TaskUpdateRequest $request, int $id): JsonResponse
    {
        try {
            $task = $this->taskService->updateTask($id, $request->validated());

            return response()->json([
                'message' => 'Görev başarıyla güncellendi',
                'task' => $task
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Görev güncellenirken bir hata oluştu'
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $task = $this->taskService->getTask($id);
        return response()->json(new TaskResource($task));

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->taskService->deleteTask($id);

            return response()->json([
                'message' => 'Görev başarıyla silindi'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Görev silinirken bir hata oluştu'
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
