<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Ideas;
use App\User;
use JavaScript;

class SinglePageController extends Controller
{
    //
    public function index(Request $request) {

        $user_data = null;
        if (Auth::user() !== null) {
            $user_data = Auth::user();
        }

        JavaScript::put([
            'user_data' => $user_data
        ]);

        return view('/index', ['userData' => $user_data]);
    }
    public function getUser(Request $request) {
        // $user->json = json_encode(array('test-key' => 'test-data'));

        $user_data = null;
        if (Auth::user() !== null) {
            $user_data = Auth::user();
        }

        $user_data = Auth::user();   

        JavaScript::put([
            'user_data' => $user_data
        ]);

        return view('/index', ['userData' => $user_data]);
    }
}
