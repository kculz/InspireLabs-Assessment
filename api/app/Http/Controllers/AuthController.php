<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    use HasApiTokens;
    
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
        
        $socialiteUser = Socialite::driver('google')->stateless()->user();
       
    
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

            Auth::login($user);
        }
    
        // Log in the user using the Auth facade
        Auth::login($user);
    
        return response()->json([
            'user' => $user,
            'token' => $user->createToken('google-token')->plainTextToken,
            'token_type' => 'Bearer',
        ]);
    }

    public function register(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        // Create a new user
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        // Generate JWT token
        $token = auth()->login($user);

        // Return the token and user data
        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function login(Request $request)
    {
           // Validate the request data
    $validatedData = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    // Check if the user exists
    $user = User::where('email', $validatedData['email'])->first();

    if (!$user) {
        return response()->json(['message' => 'invalid credentions'], 404);
    }

    // Check if the user has a google_id
    if ($user->google_id) {
        return response()->json(['error' => 'Login with Google instead'], 400);
    }

    // Attempt to authenticate the user
    // Attempt to authenticate the user
    if (!Auth::attempt($validatedData)) {
        throw ValidationException::withMessages([
            'email' => 'The provided credentials are incorrect.',
        ]);
    }

    // Get the authenticated user
    $user = Auth::user();

    // Generate token
    $token = $user->createToken('auth-token')->plainTextToken;

    // Return the token and user data
    return response()->json([
        'data' => [
            'token' => $token,
            'user' => $user,
            'message' => 'success'
        ]
    ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

}
