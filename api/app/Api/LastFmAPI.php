<?php

namespace App\Api;

use GuzzleHttp\Client;

class LastFmAPI
{
    private $apiKey;
    private $client;

    public function __construct()
    {
        $this->apiKey = env('LAST_API_KEY');
        $this->client = new Client(['base_uri' => 'http://ws.audioscrobbler.com/2.0/']);
    }

 
    public function searchArtistInfo($artistName)
    {
        $artistSearchResults = $this->makeRequest('artist.search', ['artist' => $artistName, 'limit' => 1]);
    
        if (isset($artistSearchResults['results']['artistmatches']['artist'][0])) {
            $artist = $artistSearchResults['results']['artistmatches']['artist'][0];
            $artistInfo = $this->makeRequest('artist.getInfo', ['artist' => $artist['name']]);
            $topTracks = $this->makeRequest('artist.getTopTracks', ['artist' => $artist['name'], 'limit' => 5]);
            $topAlbums = $this->makeRequest('artist.getTopAlbums', ['artist' => $artist['name'], 'limit' => 5]);
    
            return [
                'info' => $artistInfo,
                'topTracks' => $topTracks,
                'topAlbums' => $topAlbums
            ];
        } else {
            return null;
        }
    }

    public function searchAlbumInfo($albumTitle)
    {
        $albumSearchResults = $this->makeRequest('album.search', ['album' => $albumTitle]);
    
        if (isset($albumSearchResults['results']['albummatches']['album'])) {
            $album = $albumSearchResults['results']['albummatches']['album'][0];
            $albumInfo = $this->makeRequest('album.getInfo', ['artist' => $album['artist'], 'album' => $album['name']]);
            
            // Retrieve album tracks
            $tracks = [];
            if (isset($albumInfo['album']['tracks']['track'])) {
                if (isset($albumInfo['album']['tracks']['track'][0])) {
                    // Multiple tracks
                    foreach ($albumInfo['album']['tracks']['track'] as $track) {
                        $tracks[] = $track['name'];
                    }
                } else {
                    // Single track
                    $tracks[] = $albumInfo['album']['tracks']['track']['name'];
                }
            }
            
            $albumDetails = [
                'title' => $album['name'],
                'artist' => $album['artist'],
                'released' => $albumInfo['album']['wiki']['published'],
                'content' => $albumInfo['album']['wiki']['content'],
                'cover_art' => $albumInfo['album']['image'][4]['#text'],
                'tracks' => $tracks
            ];
    
            return $albumDetails;
        } else {
            return null;
        }
    }

    public function searchArtists($query)
    {
        return $this->makeRequest('artist.search', ['artist' => $query]);
    }


    public function getTopSongs($limit = 10)
    {
        return $this->makeRequest('chart.getTopTracks', ['limit' => $limit]);
    }

    private function makeRequest($method, $params)
    {
        $params = array_merge($params, [
            'method' => $method,
            'api_key' => $this->apiKey,
            'format' => 'json',
        ]);

        $response = $this->client->get('', ['query' => $params]);

        return json_decode($response->getBody(), true);
    }
}