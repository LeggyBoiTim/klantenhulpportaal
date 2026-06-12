<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/auth', [AuthController::class, 'logout']);
});
