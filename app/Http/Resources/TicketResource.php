<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $isAdmin = $request->user()->role === 'admin';

        return [
            'id' => $this->id,
            'assigned_id' => $this->assigned_id,
            'category_id' => $this->category_id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'content' => $this->content,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'reactions' => ReactionResource::collection($this->reactions),
            'notes' => $this->when($isAdmin, NoteResource::collection($this->notes)),
            'user_first_name' => $this->user->first_name,
            'user_last_name' => $this->user->last_name,
            'assigned_first_name' => $this->assigned->first_name ?? '',
            'assigned_last_name' => $this->assigned->last_name ?? '',
            'category_name' => $this->category->name,
        ];
    }
}
