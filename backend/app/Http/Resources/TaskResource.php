<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'user_id' => $this->user_id,
            'assigned_to' => $this->assigned_to,
            'due_date' => $this->due_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'can_manage' => $this->can_manage,
            'status_badge' => $this->getStatusBadge(),
            'status_text' => $this->getStatusText(),
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name
            ],
            'assignee' => $this->when($this->assignee, [
                'id' => $this->assignee?->id,
                'name' => $this->assignee?->name
            ])
        ];
    }

    private function getStatusBadge(): array
    {
        return match($this->status) {
            'completed' => ['color' => 'green.800', 'bg' => 'green.100'],
            'pending' => ['color' => 'yellow.800', 'bg' => 'yellow.100'],
            default => ['color' => 'gray.800', 'bg' => 'gray.100'],
        };
    }

    private function getStatusText(): string
    {
        return match($this->status) {
            'completed' => 'Tamamlandı',
            'pending' => 'Bekliyor',
            default => 'Bilinmiyor',
        };
    }
}
