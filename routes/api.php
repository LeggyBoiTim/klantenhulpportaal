<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ReactionController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
Route::post('/auth', [AuthController::class, 'login']);
Route::delete('/auth', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category}', [CategoryController::class, 'show']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    Route::get('/reactions', [ReactionController::class, 'index']);
    Route::get('/reactions/{reaction}', [ReactionController::class, 'show']);
    Route::post('/reactions', [ReactionController::class, 'store']);
    Route::put('/reactions/{reaction}', [ReactionController::class, 'update']);
    Route::delete('/reactions/{reaction}', [ReactionController::class, 'destroy']);

    Route::get('/tickets', [TicketController::class, 'index']);
    Route::get('/tickets/{ticket}', [TicketController::class, 'show']);
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::put('/tickets/{ticket}', [TicketController::class, 'update']);
    Route::delete('/tickets/{ticket}', [TicketController::class, 'destroy']);

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
});
