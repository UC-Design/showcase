<?php

namespace App\Http\Controllers;

use App\Ideas;
use App\User;
use App\Discussion;
use App\DiscussionReply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use App\Http\Controllers;
use Illuminate\Database\Eloquent\Collection;
use JavaScript;
use Illuminate\Support\Facades\DB;

class DiscussionController extends Controller
{
    // get all discussions from an idea_id
    public function getAll($idea_id)
    {
        // $discussions = Discussion::all()->where('idea_id', $idea_id);
        $discussions = DB::table('discussions')->orderBy('created_at', 'desc')->where('idea_id', $idea_id)->get();
        $all_user = [];

        foreach ($discussions as $discussion) {
            
            $user = DB::table('user_meta_datas')->where('user_id', $discussion->user_id)->get();
            $all_user[$discussion->id] = $user;
        }
        
        // $users = DB::table('user_meta_datas')->get();

        // return $discussions;
        // return $discussions;
        return response()->json([
            'discussions' => $discussions,
            'all_user' => $all_user
        ]);
    }

    public function getById($discussions_id)
    {
        $discussion_item = Discussion::all()->where('id', $discussions_id)->first();
        return $discussion_item;
    }

    public function create(Request $request, $id)
    {
        $new_discussion = new Discussion([
            'user_id' => Auth::id(),
            'idea_id' => $id,
            'title' => $request->title,
            'message' => $request->message,
            'replies' => 0,
        ]);

        $new_discussion->save();
        return $new_discussion;
    }

    public function updateIdea(Request $request, $id)
    {
        $filtered_discussion_data = collect(request()->all())->filter()->all();
        $status = Discussion::find($id)->first()->update($filtered_discussion_data);

        $new_idea_data = $this->getById($id);
        return response()->json([
            'status' => $status,
            'message' => $new_idea_data ? 'Idea updated' : 'Error updating Idea'
        ]);
    }

    public function deleteEntry($id)
    {
        $discussion_id = $this->getById($id);
        DB::table('discussion_replies')->where('discussions_id', $id)->delete();
  
        $status = $discussion_id->delete();
        return response()->json([
            'status' => $status,
            'id' => $id,
            'message' => $id ? 'Idea Deleted!' : 'Error Deleting Idea'
        ]);
    }
}