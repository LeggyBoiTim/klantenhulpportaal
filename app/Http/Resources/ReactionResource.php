<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'ticket_id' => $this->assigned_id,
            'user_id' => $this->category_id,
            'content' => $this->content,
            'user' => $this->user->name,
            'ticket' => $this->ticket->title,
        ];
    }
}
