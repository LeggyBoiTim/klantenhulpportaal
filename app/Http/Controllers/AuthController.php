<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\PasswordEmailRequest;
use App\Http\Requests\Auth\PasswordUpdateRequest;
use App\Models\User;
use App\Notifications\PasswordResetNotification;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
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

    public function passwordEmail(PasswordEmailRequest $request): JsonResponse
    {
        $data = $request->validated();

        $token = Str::random(60);
        $email = $data['email'];
        $user = User::getByEmail($email);

        DB::table('password_reset_tokens')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => new Carbon
        ]);

        Notification::send($user, new PasswordResetNotification($token, $email));

        return response()->json(['message' => 'E-mail verstuurd.']);
    }

    public function passwordUpdate(PasswordUpdateRequest $request): JsonResponse
    {
        $data = $request->validated();
        
        $token = $data['token'];
        $email = $data['email'];

        $user = User::getByEmail($email);

        $record = DB::table('password_reset_tokens')
            ->where('email', $email)
            ->where('token', $token)
            ->first();
        
        if (!$record) {
            return response()->json(['message' => 'De resetlink is ongeldig of verlopen.'], 422);
        }

        $user->forceFill([
            'password' => bcrypt($data['password']),
            'remember_token' => Str::random(10)
        ])->save();

        DB::table('password_reset_tokens')
            ->where('email', $email)
            ->where('token', $token)
            ->delete();

        return response()->json(['message' => 'Wachtwoord gewijzigd.']);
    }
}
