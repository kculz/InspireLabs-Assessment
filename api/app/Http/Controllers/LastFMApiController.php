<?php

namespace App\Http\Controllers;

use App\Api\LastFmAPI;
use Illuminate\Http\Request;

class LastFMApiController extends Controller
{
    /**
     * Get top songs from lastfm api
     */
    public function getLastFMTopSongs()
    {
        try {
            $lastFM = new LastFmAPI();

            $songs = $lastFM->getTopSongs(10);
            return response()->json(['songs' => $songs]);
        } catch (\Throwable $th) {
            return response()->json(['error' => "Internal server error. " . $th->getMessage()]);
        }
    }

    /**
     * Search for artist
     */
    public function searchForArtist(Request $request)
    {
        $query = $request->query('q');

        $lastFM = new LastFmAPI();

        $artistData = $lastFM->searchArtistInfo($query);

        if($artistData === null){
            return response()->json(['message' => "Result not found."]);
        }

        return response()->json(['results' => $artistData]);
    }

    /**
     * Search for albums
     */
    public function searchForAlbum(Request $request)
    {
        $query = $request->query('q');

        $lastFM = new LastFmAPI();

        $albumsData = $lastFM->searchAlbumInfo($query);

        if($albumsData === null){
            return response()->json(['message' => 'Result not found.']);
        }

        return response()->json(['results' => $albumsData]);
        
    }

}
