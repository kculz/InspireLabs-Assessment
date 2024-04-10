<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FavouriteSong extends Model
{
    use HasFactory;

    protected $fillable = [
        'track_title',
        'artist',
        'cover_art',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
