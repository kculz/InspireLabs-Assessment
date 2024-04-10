<?php

namespace App\Http\Controllers;

use App\Models\FavouriteAlbum;
use App\Models\FavouriteArtist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FavoriteController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $favouriteAlbums = $user->favouriteAlbums;
        $favouriteArtists = $user->favouriteArtists;

        return response()->json([
            'data' => [
                'user' => $user,
                'albums' => $favouriteAlbums,
                'artists' => $favouriteArtists
            ]
        ]);
    }

    public function toggleAlbumFavorite(Request $request)
    {
        $user = Auth::user();

        Log::info($user);
        $album_title = $request->input('album_title');
        $artist = $request->input('artist');
        $track_no = $request->input('track_no');
        $cover_art = $request->input('cover_art');

        // Check if the album is already in the user's favorites
        $existingFavorite = $user->favouriteAlbums()->where('album_title', $album_title)->first();

        if ($existingFavorite) {
            // If the album is already a favorite, remove it
            $existingFavorite->delete();
            return response()->json(['message' => 'Album removed from favorites.']);
        } else {
            // If the album is not a favorite, add it
            $favorite = new FavouriteAlbum([
                'album_title' => $album_title,
                'artist' => $artist,
                'cover_art' => $cover_art,
                'track_no' => $track_no,
                'user_id' => $user->id,
            ]);
            $favorite->save();
            return response()->json(['message' => 'Album added to favorites.']);
        }
    }


    public function toggleArtistFavorite(Request $request)
    {
        $user = Auth::user();
        $artist = $request->input('artist');
        

        // Check if the artist is already in the user's favorites
        $existingFavorite = $user->favouriteArtists()->where('artist', $artist)->first();

        if ($existingFavorite) {
            // If the artist is already a favorite, remove it
            $existingFavorite->delete();
            return response()->json(['message' => 'Artist removed from favorites.']);
        } else {
            // If the artist is not a favorite, add it
            $favorite = new FavouriteArtist([
                'artist' => $artist,
                'user_id' => $user->id
            ]);
            $favorite->save();
            return response()->json(['message' => 'Artist added to favorites.']);
        }
    }

    public function toggleSongFavorite(Request $request)
    {
        $user = Auth::user();
        $artist = $request->input('artist');
        $track_title = $request->input('track_title');
        $cover_art = $request->input('cover_art');

        // Check if the song is already in the user's favorites
        $existingFavorite = $user->favouriteSongs()->where('track_title', $track_title)->first();

        if ($existingFavorite) {
            // If the track is already a favorite, remove it
            $existingFavorite->delete();
            return response()->json(['message' => 'track removed from favorites.']);
        } else {
            // If the track is not a favorite, add it
            $favorite = new FavouriteAlbum([
                'artist' => $artist,
                'cover_art' => $cover_art,
                'track_title' => $track_title,
                'user_id' => $user->id,
            ]);
            $favorite->save();
            return response()->json(['message' => 'Song added to favorites.']);
        }
    }

}