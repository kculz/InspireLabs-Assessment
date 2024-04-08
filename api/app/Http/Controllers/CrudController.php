<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddSongRequest;
use App\Http\Requests\AlbumRequest;
use Illuminate\Http\Request;
use App\Models\Artist;
use App\Models\Album;
use App\Models\Song;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

class CrudController extends Controller
{

    public function search(Request $request)
    {
        $query = $request->query('q');

        $songResults = Song::where('title', 'LIKE', "%{$query}%")
            ->orWhereHas('artist', function ($artistQuery) use ($query) {
                $artistQuery->where('name', 'LIKE', "%{$query}%");
            })
            ->orWhereHas('album', function ($albumQuery) use ($query) {
                $albumQuery->where('title', 'LIKE', "%{$query}%");
            })
            ->with('artist', 'album')
            ->get();

        $artistResults = Artist::where('name', 'LIKE', "%{$query}%")
            ->with('songs')
            ->get();

        $albumResults = Album::where('title', 'LIKE', "%{$query}%")
            ->with('songs')
            ->get();

        $results = $songResults->concat($artistResults->flatMap->songs)->concat($albumResults->flatMap->songs);

        return response()->json(['results'=> $results]);
    }
    /**
     * Show all songs 
     */
    public function allSongs()
    {
        try {
            $songs = Song::all();
            return response()->json($songs);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Show all artists
     */
    public function allArtists()
    {
        try {
            $artists = Artist::all();
            return response()->json(['artists' => $artists]);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Show all Albums and the artists of that album
     */
    public function allAlbums()
    {
        try {
            $albums = Album::all();

            return response()->json(['albums' => $albums]);
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
            $songs = Song::with('album', 'artist')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
            return response()->json(['songs' => $songs]);
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
            $albums = Album::with('artist')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

            return response()->json(['albums' => $albums]);
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
            $name = $request->input('name');

            // Check if artist already exists
            $existingArtist = Artist::where('name', $name)->first();
            if ($existingArtist) {
                return response()->json(['error' => 'Artist already exists']);
            }

            $artist = new Artist();
            $artist->name = $name;
            $artist->bio = $request->input('bio');
            $artist->save();

            return response()->json(['message' => 'Artist added successfully']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Internal server error. ' . $th->getMessage()]);
        }
    }

    /**
     * Add new albums 
     */
    public function addAlbums(AlbumRequest $request)
    {
        try {

            $validatedData = $request->validated();

            $existingAlbum = Album::where('artist_id', $validatedData['artist_id'])
                ->where('title', $validatedData['title'])
                ->first();
    
            if ($existingAlbum) {
                return response()->json(['error' => 'Album for this artist already exists']);
            }
    
            $coverArtPath = $request->file('cover_art')->store('uploads', 'public');
    
            $album = new Album();
            $album->title = $validatedData['title'];
            $album->artist_id = $validatedData['artist_id'];
            $album->cover_art = $coverArtPath;
    
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
            $title = $request->input('title');
            $existingSong = Song::where('title', $title)->first();
    
            if ($existingSong) {
                return response()->json(['error' => 'Song already exists.'], 409);
            }
    
            $song = new Song();
            $song->title = $title;
            $song->artist_id = $request->input('artist_id');
            $song->album_id = $request->input('album_id');
    
            // Upload track file
            if ($request->hasFile('track')) {
                $track = $request->file('track');
                $maxFileSize = 20 * 102409; // 20MB (20 * 1024 KB)
                if ($track->getSize() > $maxFileSize) {
                    return response()->json(['error' => 'Track file size exceeds the limit.'], 422);
                }
                $trackPath = $track->store('uploads', 'public');
                $song->track = $trackPath;
            } else {
                $song->track = ''; // Set an empty string as the default value
            }
    
            // Upload cover art file
            if ($request->hasFile('cover_art')) {
                $coverArt = $request->file('cover_art');
                $coverArtPath = $coverArt->store('uploads', 'public');
                $song->cover_art = $coverArtPath;
            }
    
            $song->save();
    
            return response()->json(['message' => 'Song added successfully']);
        } catch (ModelNotFoundException $exception) {
            return response()->json(['error' => 'Invalid artist or album ID '. $exception], 404);
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