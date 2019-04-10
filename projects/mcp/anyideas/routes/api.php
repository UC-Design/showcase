<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// CURD - Create / Update / Retrieve / Destroy

Auth::routes();

// Route::middleware('api', 'throttle:60,1')->group(function () {
//     Route::get('/user', 'IdeasController@getUser')->name('user');
// });

// Route::apiResources([
//     'user' => 'IdeasController@getUser'
// ]);

// Route::get('/user', 'IdeasController@getUser')->middleware('auth');

// user routes
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::group(['middleware' => ['auth:api']], function () {
// 	Route::get('/idea/user/get', 'IdeasController@getUser');
// });


// idea routes
// Route::get('/idea/get/all', 'IdeasController@getAll');
// Route::get('/user/get', 'IdeasController@getUser');

// // put id/params at the end

// Route::post('/idea/create', 'IdeasController@createIdea');
// Route::post('/idea/delete/{id}', 'IdeasController@deleteIdea');
// Route::post('/idea/update/{id}', 'IdeasController@updateIdea');

// Route::get('/idea/get/{id}', 'IdeasController@getById');
// Route::get('/idea/get-by-user/{id}', 'IdeasController@getByUser');
// Route::get('/idea/get-by-title/{title}', 'IdeasController@getByTitle');
// Route::get('/idea/get-by-category/{category}', 'IdeasController@getByCategory');
// Route::get('/idea/get-by-tags', 'IdeasController@getByTags');

// // timeline routes
// Route::get('/idea/timeline/{idea_id}/get', 'TimelineController@getAll');

// darts routes 
