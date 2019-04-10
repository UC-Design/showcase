<?php

namespace App\Http\Controllers;

use App\Ideas;
use App\User;
use App\UpdatesPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use App\Http\Controllers;
use Illuminate\Database\Eloquent\Collection;
use JavaScript;
use Illuminate\Support\Facades\DB;

class UpdatesPostController extends Controller
{
    // get all discussions from an idea_id
    public function getAllByIdeaId($idea_id)
    {
        // $test = UpdatesPost::all()-;
        // $updates_posts = UpdatesPost::all()->where('idea_id', $idea_id);
        $updates_posts = DB::table('updates_posts')->orderBy('created_at', 'desc')->where('idea_id', $idea_id)->get();

        return $updates_posts;
    }

    public function getById($updates_post_id)
    {
        $updates_post = UpdatesPost::all()->where('id', $updates_post_id)->first();

        return $updates_post;
    }

    public function create(Request $request, $id)
    {

        $new_updates_post = new UpdatesPost([
            'user_id' => Auth::id(),
            'idea_id' => $id,
            'title' => $request->title,
            'message' => $request->message
        ]);

        $new_updates_post->save();

        return $new_updates_post;
    }

    public function updateEntry(Request $request, $id)
    {
        $filtered_updates_post_data = collect(request()->all())->filter()->all();

        $status = UpdatesPost::find($id)->first()->update($filtered_updates_post_data);

        $new_updates_post_data = $this->getById($id);

        return response()->json([
            'status' => $status,
            'message' => $new_updates_post_data ? 'Updates Post updated' : 'Error updating Updates Post'
        ]);
    }

    public function dartAdd(Request $request, $id)
    {
        $new_darts = $this->getById($id)->darts + 1;

        $updates_post_item = $this->getById($id);

        DB::table('updates_posts')
            ->where('id', $id)
            ->update(['darts' => $new_darts]);

        return response()->json([
            'timeline_item' => $updates_post_item,
            'message' => $new_darts ? 'Idea updated' : 'Error updating Idea'
        ]);
    }

    public function deleteEntry($id)
    {
        $updates_post_id = $this->getById($id);

        $status = $updates_post_id->delete();

        return response()->json([
            'status' => $status,
            'id' => $id,
            'message' => $id ? 'Updates Post Deleted!' : 'Error Deleting Updates Post'
        ]);

    }
}