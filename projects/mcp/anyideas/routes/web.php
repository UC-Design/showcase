<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\Ideas as Ideas;
use Illuminate\Http\Request;

Auth::routes();

Route::get('/{any}', 'SinglePageController@index')->where('any', '.*');

Route::group(['prefix' => 'ai/'], function() {
    //user routes
    Route::post('/user/get/current', 'IdeasController@getUser');
    Route::post('/user/get/{id}', 'UserController@getUserById');
    Route::post('/user/update/{id}', 'UserController@updateUser');
    Route::post('/user/update.meta/{id}', 'UserController@updateUserMetadata');
    Route::post('/user/validateRegister', 'UserController@validateRegisterField');
    Route::post('/user/auth', 'UserController@authenticate');
    Route::post('/user/register', 'Auth\RegisterController@create');

    // search routes
    Route::post('/search', 'SearchController@searchQuery');

    // discover / news feed routes
    Route::post('/feed/get/', 'IdeasController@getFeed');

    //idea routes
    Route::post('/idea/get/all', 'IdeasController@getAll');
    Route::post('/idea/populateFeed', 'IdeasController@populateHomeFeed');
    Route::post('/idea/populateAuthFeed', 'IdeasController@getAuthUserInterestedInIdeas');

    Route::post('/idea/create', 'IdeasController@createIdea');
    Route::post('/idea/delete/{id}', 'IdeasController@deleteIdea');
    Route::post('/idea/update/{id}', 'IdeasController@updateIdea');

    Route::post('/idea/get/{id}', 'IdeasController@getById');
    Route::post('/idea/get-by-user/{id}', 'IdeasController@getByUser');
    Route::post('/idea/get-by-title/{title}', 'IdeasController@getByTitle');
    Route::post('/idea/get-by-category/{category}', 'IdeasController@getByCategory');
    Route::post('/idea/get-by-tags', 'IdeasController@getByTags');

        // timeline routes
        Route::post('/idea/timeline/get/{id}', 'TimelineController@getAll'); // parameter passed is idea_id
        Route::post('/idea/timeline/create/{idea_id}', 'TimelineController@create');
        Route::post('/idea/timeline/delete/{id}', 'TimelineController@deleteEntry');
        Route::post('/idea/timeline/update/{id}', 'TimelineController@updateEntry');
        Route::post('/idea/timeline/darts/add/{id}', 'TimelineController@dartAdd');

        // discussion routes
        Route::post('/idea/discussion/get/{idea_id}', 'DiscussionController@getAll'); // parameter passed is idea_id
        Route::post('/idea/discussion/create/{idea_id}', 'DiscussionController@create'); // pass idea_id
        Route::post('/idea/discussion/delete/{id}', 'DiscussionController@deleteEntry'); // pass id of discussion
        Route::post('/idea/discussion/update/{id}', 'DiscussionController@updateEntry'); // pass id of discussion

            // discussion reply routes
            Route::post('/idea/discussion/reply/get/{id}', 'DiscussionReplyController@getById'); // pass discussion_reply_id
            Route::post('/idea/discussion/reply/get/all/{discussion_id}', 'DiscussionReplyController@getAllByDiscId'); // pass discussion_id
            Route::post('/idea/discussion/reply/create/{discussion_id}', 'DiscussionReplyController@create'); // pass discussion_id
            Route::post('/idea/discussion/reply/delete/{id}', 'DiscussionReplyController@deleteEntry');
            Route::post('/idea/discussion/reply/update/{id}', 'DiscussionReplyController@updateEntry');
            Route::post('/idea/discussion/reply/darts/{reply_id}', 'DiscussionReplyController@darts'); // pass in either 'up' pr 'down'
        
        // updates_post routes
        Route::post('/idea/update_post/get/{id}', 'UpdatesPostController@getById'); // pass update_post_id
        Route::post('/idea/update_post/get/all/{idea_id}', 'UpdatesPostController@getAllByIdeaId'); // pass idea_id
        Route::post('/idea/update_post/create/{idea_id}', 'UpdatesPostController@create'); // pass idea_id
        Route::post('/idea/update_post/delete/{id}', 'UpdatesPostController@deleteEntry');
        Route::post('/idea/update_post/update/{id}', 'UpdatesPostController@updateEntry');
        Route::post('/idea/update_post/darts/add/{id}', 'UpdatesPostController@dartAdd');
    
});

Route::post('/logout', function() {
    Auth::logout();
    return Redirect::to('/');
});