<?php

namespace App\Http\Controllers;

use App\Ideas;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use App\Http\Controllers;
use JavaScript;
use Illuminate\Support\Facades\DB;

class IdeasController extends Controller
{
    // get currently logged in user
    public function getUser(Request $request) { 
        $user = Auth::user();
        $id = Auth::id();

        if ($user === null) {
            return 'no logged in user - please login';
        };
        return ['user' => $user, 'id' => $id];
    }
    public function getUserById($id) {
        $user = User::all()->where('id', $id)->first();
        $meta = DB::table('user_meta_datas')->where('user_id', $id)->first();
        $interests = json_decode($user->interests);
        $social = json_decode($meta->social_media);

        return response()->json([
            'user' => $user,
            'interests' => $interests,
            'user_meta' => $meta,
            'social_media' => $social
        ]);
    }

    // mass GET ideas
    public function getAll()
    {
        $ideas = Ideas::all();
        return $ideas;
    }
    public function getByTitle($title)
    {
        $ideas = Ideas::all()->where('title', $title);
        return $ideas;
    }
    public function getByCategory($category)
    {
        $ideas_with_category = Ideas::all()->where('category', $category);
        return $ideas_with_category;
    }

    public function getByUser($id)
    {
        $ideas = Ideas::all()->where('user_id', $id);
        
        return array(
            'ideas' => $ideas
        );
    }

    public function getByTags(Request $request)
    {
        $decoded_tags = preg_split("/[,]/",$request->tags);
        $return_ideas = [''];

        $collection = DB::Table('ideas')->select('*');
        foreach($decoded_tags as $key => $tag) {
            if($key == 0) {
                $collection->where('tags', 'like', '%'.$tag.'%');
            }
            $collection->orWhere('tags', 'like', '%'.$tag.'%');
        }

        $ideas = $collection->get();
        return ['ideas' => $ideas];
    }
    // single idea functions
    public function getById($id) {
        $idea = Ideas::all()->where('id', $id)->first();
        return $idea;
    }
    public function createIdea(Request $request)
    {
        $user_id = Auth::id();


        $idea = new Ideas([
            'user_id' => $user_id,
            'success' => false,
            'title' => $request->title,
            'pitch' => $request->pitch,
            'category' => $request->category,
            'status' => $request->status,
            'tags' => $request->tags,
            'description' => $request->description
        ]);

        $idea->save();
        return $idea;
    }
    public function updateIdea(Request $request, $id)
    {
        $filtered_idea_data = collect(request()->all())->filter()->all();
        $found_id = Ideas::where('id', $id)->update($filtered_idea_data);

        $updated_idea = Ideas::find($id)->first();

        $new_idea_data = $this->getById($id);
        return response()->json([
            'updated_idea' => $updated_idea,
            'f-data' => $filtered_idea_data,
            'id' => $id,
            // 'status' => $status,
            'message' => $new_idea_data ? 'Idea updated' : 'Error updating Idea'
        ]);
    }
    public function deleteIdea($idea)
    {
        $idea = $this->getById($idea);

        $discussion_replies_id = DB::table('discussion_replies')->where('idea_id', $idea->id)->delete();
        $discussion_id = DB::table('discussions')->where('idea_id', $idea->id)->delete();
        $timeline_id = DB::table('timelines')->where('idea_id', $idea->id)->delete();
        $updates_posts_id = DB::table('updates_posts')->where('idea_id', $idea->id)->delete();

        $status = $idea->delete();
        return response()->json([
            'discussion_replies_id' => $discussion_replies_id,
            'discussion_id' => $discussion_id,
            'updates_posts_id' => $updates_posts_id,
            'timeline_id' => $timeline_id,
            'idea' => $idea,
            'status' => $status,
            'message' => $status ? 'Idea Deleted!' : 'Error Deleting Idea'
        ]);
    }

    public function getAuthUserInterestedInIdeas(Request $request) {
        $ideas = array();
        $not_in = [];
        $limit = 10;
        $offset = 0;
        $total_count = Ideas::all()->count();

        if (isset($request['limit'])) {
            $limit = $request['limit'];
        }

        if (isset($request['offset'])) {
            $offset = $request['offset'];
        }

        if (isset($request['not_in'])) {
            $not_in = $request['not_in'];
        }
        
        if (Auth::check()) {
            $interests = json_decode(Auth::user()->interests);
            if (count($interests) > 0) {
                $ideas = Ideas::whereIn('category', $interests)
                    ->whereNotIn('id', $not_in)
                    ->orderBy('created_at', 'desc')
                    ->skip($offset)
                    ->take($limit)
                    ->get();
            }
        }

        if (count($ideas) > 0) {
            foreach($ideas as $idea) {
                array_push($not_in, $idea->id);
            }
        }

        return response()->json(array(
            'ideas' => $ideas,
            'limit' => $limit,
            'offset' => count($ideas),
            'not_in' => $not_in,
            'total_count' => $total_count
        ));
    }

    public function populateHomeFeed(Request $request) {
        $ideas = array();
        $limit = 10;
        $offset = 0;
        $total_count = Ideas::all()->count();
        $not_in = array();

        if (isset($request['limit'])) {
            $limit = $request['limit'];
        }

        if (isset($request['not_in'])) {
            $not_in = $request['not_in'];
        }

        if (isset($request['offset'])) {
            $offset = $request['offset'];
        }

        $ideas = Ideas::whereNotIn('id', $not_in)
            ->orderBy('created_at', 'desc')
            ->skip($offset)
            ->take($limit)
            ->get();

        return response()->json(array(
            'ideas' => $ideas,
            'total_count' => $total_count,
            'limit' => $limit,
            'not_in' => $not_in,
            'offset' => count($ideas)
        ));
    }
}