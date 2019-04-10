<?php

namespace App\Http\Controllers;

use App\Ideas;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use App\Http\Controllers;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    // get currently logged in user
    public function getUser(Request $request) { 
        $user = Auth::user();
        $id = Auth::id();

        if ($user === null) {
            return alert('no logged in user - please login');
        };
        return ['user' => $user, 'id' => $id];
    }

    public function getUserById($id) {

        $res = array();

        $user = User::all()->where('id', $id)->first();
        $meta = DB::table('user_meta_datas')->where('user_id', $id)->first();

        $res['user'] = $user;
        $res['user_meta'] = $meta;
        
        if (isset($user->interests)) {
            $res['interests'] = json_decode($user->interests);
        }

        if (!is_null($meta) && isset($meta->social_media)) {
            $res['social_media'] = json_decode($meta->social_media);
        }

        return response()->json($res);
    }

    public function updateUser(Request $request, $id) {
        if (!Auth::check()) {
            return response()->json(array(
                'succes' => false,
                'msg' => 'You must be logged in to perform this action'
            ));
        }

        $data = $request['user_meta_update'];
        $update_obj = array();

        $user = User::findOrFail($id);
        $auth_id = Auth::id();

        if ($user->id !== $auth_id) {
            return response()->json(array(
                'success' => false,
                'msg' => 'You can only update your own data'
            ));
        }

        foreach($data as $key => $value) {
            if (!is_null($value)) {
                if (trim($value) !== '') {
                    $update_obj[$key] = $value;
                }
            }
        }

        foreach($update_obj as $key => $value) {
            $user[$key] = $value;
        }

        $user->save();

        return response()->json([
            'success' => true,
            'user' =>  $user
        ]);
    }

    private function getNulledUserMeta() {
        return array(
            'occupation' => null,
            'website' => null,
            'bio' => null,
            'avatar' => null,
            'following' => null,
            'followers' => null,
            'likes' => "",
            'social_media' => null,
            'interests' => null
        );
    }

    public function updateUserMetadata(Request $request, $id) {
        if (!Auth::check()) {
            return response()->json(array(
                'succes' => false,
                'msg' => 'You must be logged in to perform this action'
            ));
        }

        $data = $request['user_meta_update'];
        $update_obj = array();

        $user = User::findOrFail($id);
        $auth_id = Auth::id();

        if ($user->id !== $auth_id) {
            return response()->json(array(
                'success' => false,
                'msg' => 'You can only update your own data'
            ));
        }

        $meta = DB::table('user_meta_datas')->where('user_id', '=', $user->id)->first();

        foreach($data as $key => $value) {
            if (!is_null($value)) {
                $update_obj[$key] = $value;
            }
        }
        
        $nulledArray = $this->getNulledUserMeta();
        $update_obj['user_id'] = $auth_id;

        if (is_null($meta)) {
            $update_obj = array_merge($nulledArray, $update_obj);
            $meta = DB::table('user_meta_datas')->insert($update_obj);
        }
        else {
            $update_obj = array_merge($nulledArray, $update_obj);
            $meta = DB::table('user_meta_datas')
                ->where('user_id', '=', $user->id)
                ->update($update_obj);
        }

        return response()->json([
            'success' => true,
            'user' =>  $user,
            'meta' => $meta,
            'bio' => $request['user_meta_update'],
            'update' => $update_obj
        ]);
    }

    public function validateRegisterField(Request $request) {
        $field = $request['key'];
        $value = $request['value'];
        $user = User::where($field, $value)->first();

        return response()->json([
            'user' => $user
        ]);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $success = Auth::attempt($credentials);

        if ($success) {
            $user = Auth::user();
            return response()->json(array(
                'success' => $success,
                'user' => $user
            ));
        }
        else {
            return response()->json(array(
                'success' => $success,
                'message' => 'Provided details did not work, please try again.'
            ));
        }
    }
}
