<?php

namespace App\Http\Controllers;

use App\Ideas;
use App\User;
use App\Timeline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as Auth;
use App\Http\Requests;
use App\Http\Controllers;
use JavaScript;
use Illuminate\Support\Facades\DB;

class TimelineController extends Controller
{
    // gets all timeline posts from single idea_id
    public function getAll($idea_id)
    {
        // $timeline_entries = Timeline::all()->where('idea_id', $idea_id)->orderBy('id')->get();
        $timeline_entries = DB::table('timelines')->orderBy('created_at', 'desc')->where('idea_id', $idea_id)->get();

        return $timeline_entries;
    }

    // gets single timeline post given timeline_id
    public function getById($id)
    {
        $timeline_single = Timeline::all()->where('id', $id)->first();

        return $timeline_single;
    }

    public function create(Request $request, $idea_id)
    {
        $timeline = new Timeline([
            'user_id' => Auth::id(),
            'idea_id' => $idea_id,
            'title' => $request->title,
            'message' => $request->message,
            'link' => $request->link
        ]);

        $timeline->save();

        return $timeline;
    }

    public function updateEntry(Request $request, $id)
    {
        $filtered_idea_data = collect(request()->all())->filter()->all();

        $status = Timeline::find($id)->first()->update($filtered_idea_data);

        $new_idea_data = $this->getById($id);

        return response()->json([
            'status' => $status,
            'message' => $new_idea_data ? 'Idea updated' : 'Error updating Idea'
        ]);
    }

    public function dartAdd(Request $request, $id)
    {
        $new_darts = $this->getById($id)->darts + 1;

        $timeline_item = $this->getById($id);

        DB::table('timelines')
            ->where('id', $id)
            ->update(['darts' => $new_darts]);

        return response()->json([
            'timeline_item' => $timeline_item,
            'message' => $new_darts ? 'Idea updated' : 'Error updating Idea'
        ]);
    }

    public function deleteEntry($id)
    {
        $id = $this->getById($id);
        $status = $id->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? 'Timeline entry Deleted!' : 'Error Deleting Timeline entry'
        ]);

    }
}