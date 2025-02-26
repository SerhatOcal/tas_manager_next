<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class TaskCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:pending,completed'],
            'assigned_to' => ['nullable', 'exists:users,id'],
            'due_date' => ['nullable', 'date', 'after_or_equal:today'],
        ];
    }
}
