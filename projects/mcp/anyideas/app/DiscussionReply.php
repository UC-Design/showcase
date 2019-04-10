<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DiscussionReply extends Model
{
    protected $fillable = [
        'user_id',
        'idea_id',
        'discussion_id',
        'id',
        'message',
        'up_votes',
        'down_votes'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function idea() {
        return $this->belongsTo(Idea::class, 'idea_id');
    }
    public function discussion() {
        return $this->belongsTo(Discussion::class, 'discussion_id');
    }
}
