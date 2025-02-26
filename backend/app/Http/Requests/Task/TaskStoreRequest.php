<?php

namespace App\Http\Requests\Task;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class TaskStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'min:3', 'max:255'],
            'description' => ['nullable', 'max:1000'],
            'due_date' => ['nullable', 'date', 'after:today'],
            'status' => ['required', 'in:pending,completed'],
        ];
    }
}
