<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Ideas as Ideas;
use App\User as User;
use JavaScript;

class SearchController extends Controller
{

    public function searchQuery(Request $request) {
        $keyword = $request->search;

        $ideasQuery = [];
        $usersQuery = [];

        $ideasQuery = Ideas::when($keyword, function ($q) use($keyword) {
            $q->where('title', 'like', '%' . $keyword . '%')
            ->orWhere('category', 'like', '%' . $keyword . '%')
            ->orWhere('tags', 'like', '%' . $keyword . '%');
            return $q;
        })->get();

        $usersQuery = User::when($keyword, function ($q) use($keyword) {
            $q->where('username', 'like', '%' . $keyword . '%')
            ->orWhere('name', 'like', '%' . $keyword . '%');
            return $q;
        })->get();

        return response()->json([
            'keyword' => $keyword,
            'ideasQuery' => $ideasQuery,
            'usersQuery' => $usersQuery,
        ]);
    }
}
