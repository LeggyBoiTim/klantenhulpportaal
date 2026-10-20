<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

Route::view('/reset-password/{token}', 'welcome')->name('password.reset');
Route::view('/login', 'welcome')->name('login');