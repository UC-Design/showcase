<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ideas extends Model
{
    //
    protected $fillable = ['user_id', 'success', 'category', 'title', 'pitch', 'status', 'tags', 'description', 'darts', 'image'];

    public function user() {
        return $this->belongsTo(App\User::class, 'user_id');
    }
    public function timeline() {
        return $this->hasMany(Timeline::class);
    }
    public function discussion() {
        return $this->hasMany(Discussion::class);
    }
    public function update_post() {
        return $this->hasMany(UpdatesPost::class);
    }
}
