<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UpdatesPost extends Model
{
    //
    protected $fillable = [
        'user_id',
        'idea_id',
        'id',
        'title',
        'message',
        'darts'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function idea() {
        return $this->belongsTo(Idea::class, 'idea_id');
    }
}
