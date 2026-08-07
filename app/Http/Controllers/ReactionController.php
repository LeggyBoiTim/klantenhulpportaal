<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReactionRequest;
use App\Http\Resources\ReactionResource;
use App\Models\Reaction;
use Illuminate\Support\Facades\Gate;

class ReactionController extends Controller
{
    public function index()
    {
        return ReactionResource::collection(Reaction::all());
    }

    public function show(Reaction $reaction)
    {
        Gate::authorize('view', $reaction);

        return new ReactionResource($reaction);
    }

    public function store(ReactionRequest $request)
    {
        $data = $request->validated();

        $reaction = Reaction::create($data);

        return new ReactionResource($reaction);
    }

    public function update(ReactionRequest $request, Reaction $reaction)
    {
        Gate::authorize('update', $reaction);

        $reaction->update($request->validated());

        return new ReactionResource($reaction);
    }

    public function destroy(Reaction $reaction)
    {
        Gate::authorize('delete', $reaction);

        $reaction->delete();
        
        return response()->json(['message' => 'Reactie succesvol verwijderd']);
    }
}
