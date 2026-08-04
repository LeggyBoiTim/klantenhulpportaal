<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::all());
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function store(UserRequest $request)
    {
        $user = User::create($request->validated());

        $users = User::all();
        return UserResource::collection($users);
    }

    public function update(UserRequest $request, User $user)
    {
        $user->update($request->validated());

        $users = User::all();
        return UserResource::collection($users);
    }

    public function destroy(User $user)
    {
        $user->delete();
        
        return response()->json(['message' => 'Gebruiker succesvol verwijderd']);
    }
}
