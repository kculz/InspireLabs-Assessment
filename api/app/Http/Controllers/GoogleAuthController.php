<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return response()->json([
            'url' => Socialite::driver('google')
                         ->stateless()
                         ->redirect()
                         ->getTargetUrl(),
        ]);
    }

    public function handleGoogleCallback()
    {
        try {
            /** @var SocialiteUser $socialiteUser */
            $socialiteUser = Socialite::driver('google')->stateless()->user();
        } catch (ClientException $e) {
            return response()->json(['error' => 'Invalid credentials provided.'], 422);
        }
    
        // Check if the user already exists in your application's users table
        $user = User::where('google_id', $socialiteUser->getId())->first();
    
        if (!$user) {
            // User doesn't exist, create a new user
            $user = User::create([
                'email' => $socialiteUser->getEmail(),
                'email_verified_at' => now(),
                'name' => $socialiteUser->getName(),
                'google_id' => $socialiteUser->getId(),
            ]);
        }
    
        // Log in the user using the Auth facade
        Auth::login($user);
    
        return response()->json([
            'user' => $user,
            'token' => $user->createToken('google-token')->plainTextToken,
            'token_type' => 'Bearer',
        ]);
    }
}
