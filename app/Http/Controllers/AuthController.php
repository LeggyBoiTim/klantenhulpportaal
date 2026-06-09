<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();
 
        if (Auth::guard('web')->attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(['message' => 'Je bent succesvol ingelogd.']);
        }
 
        return response()->json(['message' => 'De ingevoerde gegevens zijn niet juist.'], 422);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Je bent succesvol uitgelogd.']);
    }

    public function user(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }
}
