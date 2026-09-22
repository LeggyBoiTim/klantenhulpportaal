<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteRequest;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Support\Facades\Gate;

class NoteController extends Controller
{
    public function index()
    {
        return NoteResource::collection(Note::all());
    }

    public function show(Note $note)
    {
        Gate::authorize('view', $note);

        return new NoteResource($note);
    }

    public function store(NoteRequest $request)
    {
        Gate::authorize('create', Note::class);

        $data = $request->validated();

        $note = Note::create($data);

        return new NoteResource($note);
    }

    public function update(NoteRequest $request, Note $note)
    {
        Gate::authorize('update', $note);

        $note->update($request->validated());

        return new NoteResource($note);
    }

    public function destroy(Note $note)
    {
        Gate::authorize('delete', $note);

        $note->delete();
        
        return response()->json(['message' => 'Notitie succesvol verwijderd']);
    }
}
