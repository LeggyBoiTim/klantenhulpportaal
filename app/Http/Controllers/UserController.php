<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', User::class);

        return UserResource::collection(User::all());
    }

    public function store(UserRequest $request)
    {
        $user = User::create($request->validated());

        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user)
    {
        Gate::authorize('update', $user);

        $user->update($request->validated());

        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        Gate::authorize('delete', $user);

        if ($user->tickets()->where('status', '!=', 'closed')->exists()) {
            throw new HttpResponseException(response()->json([
                'message' => 'Deze gebruiker kan niet worden verwijdered omdat er nog niet afgehandelde tickets aan gekoppeld zijn.'
            ], 422));
        }

        $user->delete();
        
        return response()->json(['message' => 'Gebruiker succesvol verwijderd']);
    }
}
