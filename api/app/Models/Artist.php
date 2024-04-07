<?php

// Model: Artist.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'bio'];

    public function albums()
    {
        return $this->hasMany(Album::class);
    }

    public function songs()
    {
        return $this->hasMany(Song::class);
    }

    public function relatedArtists()
    {
        return $this->belongsToMany(Artist::class, 'related_artists', 'artist_id', 'related_artist_id');
    }

    public function favoritedByUsers()
    {
        return $this->belongsToMany(User::class, 'favorites', 'artist_id', 'user_id')
            ->withTimestamps();
    }
}
