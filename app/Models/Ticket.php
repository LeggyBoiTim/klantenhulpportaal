<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['assigned_id', 'category_id', 'user_id', 'title', 'content', 'status'])]
class Ticket extends Model
{
    public function reactions(): HasMany
    {
        return $this->hasMany(Reaction::class);
    }

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', );
    }

    public function assigned(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_id');
    }
    
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
