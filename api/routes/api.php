<?php

use App\Http\Controllers\CrudController;
use App\Http\Controllers\GoogleAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
Route::get('/auth/callback', [GoogleAuthController::class, 'handleGoogleCallback']);
Route::post('/add-artists', [CrudController::class, 'addArtists']);
Route::get('/artists', [CrudController::class, 'allArtists']);
Route::post('/add-albums', [CrudController::class, 'addAlbums']);
Route::get('/albums', [CrudController::class, 'allAlbums']);
Route::post('/add-songs', [CrudController::class, 'addSongs']);
Route::get('/top-songs', [CrudController::class, 'topSongs']);
Route::get('/top-albums', [CrudController::class, 'topAlbums']);
Route::get('/songs', [CrudController::class, 'allSongs']);
Route::get('/albums', [CrudController::class, 'allAlbums']);
Route::get('/search', [CrudController::class, 'search']);