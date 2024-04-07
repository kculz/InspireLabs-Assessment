<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artist;
use App\Models\Album;
use App\Models\Song;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CrudController extends Controller
{
    /**
     * Show all songs 
     */
    public function index()
    {
        try {
            $songs = Song::all();
            return response()->json($songs);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Show latest songs 
     */
    public function topSongs()
    {
        try {
            $songs = Song::orderBy('created_at', 'desc')->take(10)->get();
            return response()->json($songs);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Show latest albums 
     */
    public function topAlbums()
    {
        try {
            $albums = Album::orderBy('created_at', 'desc')->take(10)->get();
            return response()->json($albums);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Add new artists 
     */
    public function addArtists(Request $request)
    {
        try {
            $artist = new Artist();
            $artist->name = $request->input('name');
            $artist->save();

            return response()->json(['message' => 'Artist added successfully']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Add new albums 
     */
    public function addAlbums(Request $request)
    {
        try {
            $album = new Album();
            $album->name = $request->input('name');
            $album->artist_id = $request->input('artist_id');
            $album->save();

            return response()->json(['message' => 'Album added successfully']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Add new song 
     */
    public function addSongs(Request $request)
    {
        try {
            $song = new Song();
            $song->name = $request->input('name');
            $song->album_id = $request->input('album_id');
            $song->save();

            return response()->json(['message' => 'Song added successfully']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }


    /**
     * Delete an artist 
     */
    public function deleteArtists(Request $request)
    {
        try {
            $artistId = $request->input('artist_id');

            $artist = Artist::findOrFail($artistId);
            $artist->delete();

            return response()->json(['message' => 'Artist deleted successfully']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Delete an album 
     */
    public function deleteAlbums(Request $request)
    {
        try {
            $albumId = $request->input('album_id');

            $album = Album::findOrFail($albumId);
            $album->delete();

            return response()->json(['message' => 'Album deleted successfully']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Delete a song 
     */
    public function deleteSongs(Request $request)
    {
        try {
            $songId = $request->input('song_id');

            $song = Song::findOrFail($songId);
            $song->delete();

            return response()->json(['message' => 'Song deleted successfully']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }


    /**
     * Add a song to the authenticated user's favorites
     */
    public function addFavouriteSongs(Request $request)
    {
        try {
            $songId = $request->input('song_id');
            $user = Auth::user();
            $user->favoriteSongs()->attach($songId);

            return response()->json(['message' => 'Song added to favorites']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Remove a song from the authenticated user's favorites
     */
    public function removeFavouriteSongs(Request $request)
    {
        try {
            $songId = $request->input('song_id');
            $user = Auth::user();
            $user->favoriteSongs()->detach($songId);

            return response()->json(['message' => 'Song removed from favorites']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Add an album to the authenticated user's favorites
     */
    public function addFavouriteAlbums(Request $request)
    {
        try {
            $albumId = $request->input('album_id');
            $user = Auth::user();
            $user->favoriteAlbums()->attach($albumId);

            return response()->json(['message' => 'Album added to favorites']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Show all albums from the authenticated user's favorites
     */
    public function showFavoriteAlbums()
    {
        try {
            $user = Auth::user();
            $favoriteAlbums = $user->favoriteAlbums()->get();

            return response()->json($favoriteAlbums);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Show all songs from the authenticated user's favorites
     */
    public function showFavoriteSongs()
    {
        try {
            $user = Auth::user();
            $favoriteSongs = $user->favoriteSongs()->get();

            return response()->json($favoriteSongs);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }
}