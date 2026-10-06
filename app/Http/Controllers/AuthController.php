<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\PasswordEmailRequest;
use App\Http\Requests\Auth\PasswordUpdateRequest;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function me(Request $request) {
        return $request->user();
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();
 
        if (Auth::guard('web')->attempt($credentials)) {
            $request->session()->regenerate();
            
            return response()->json(['user' => Auth::user(), 'message' => 'Je bent succesvol ingelogd.']);
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

    public function passwordEmail(PasswordEmailRequest $request)
    {
        $request->validated();

        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::ResetLinkSent
            ? back()->with(['status' => __($status)])
            : back()->withErrors(['email' => __($status)]);
    }

    public function passwordUpdate(PasswordUpdateRequest $request)
    {
        $request->validated();
        
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PasswordReset
            ? redirect()->route('login')->with('status', __($status))
            : back()->withErrors(['email' => [__($status)]]);
    }
}
