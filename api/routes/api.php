<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\LastFMApiController;
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

// Route::middleware('auth:sanctum')


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/callback', [AuthController::class, 'handleGoogleCallback']);

Route::get('/top-songs', [LastFMApiController::class, 'getLastFMTopSongs']);
Route::get('/search', [LastFMApiController::class, 'searchForArtist']);
Route::get('/search-a', [LastFMApiController::class, 'searchForAlbum']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/fav-artists', [FavoriteController::class, 'toggleArtistFavorite']);
    Route::post('/fav-albums', [FavoriteController::class, 'toggleAlbumFavorite']);
    Route::post('/fav-songs', [FavoriteController::class, 'toggleSongFavorite']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/profile', [FavoriteController::class, 'index']);
Route::get('/logout', [AuthController::class, 'logout']);

});

