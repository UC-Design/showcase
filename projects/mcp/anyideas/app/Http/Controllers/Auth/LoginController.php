<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{

    use AuthenticatesUsers;

    public function index() {
        return view('/');
    }
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    // public function authenticate(Request $request)
    // {
    //     $credentials = $request->only('email', 'password');

    //     if (Auth::attempt($credentials)) {
    //         // Authentication passed...
    //         return ['success... hopefully' => $credentials];
    //     }
    // }

    public function logout(Request $request)
    {

        Auth::logout();
        $this->guard()->logout();

        $request->session()->invalidate();

        if ($request->wantsJson()) {
            return response()->json([], 204);
        }

        $request->session()->regenerate();       

        return redirect('/');
    }
}
