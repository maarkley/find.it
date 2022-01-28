<?php namespace App\Models;
use App\User;
use App\Models\Conversation;

use Illuminate\Database\Eloquent\Model;
class Message extends Model
{
    protected $table = 'messages';
    public $timestamps = true;
    public $fillable = [
        'message',
        'is_seen',
        'deleted_from_sender',
        'deleted_from_receiver',
        'user_id',
        'conversation_id',
    ];
    /*
     * make dynamic attribute for human readable time
     * */
    public function getHumansTimeAttribute()
    {
        $date = $this->created_at;
        $now = $date->now();
        return $date->diffForHumans($now, true);
    }
    /*
     * make a relation between conversation model
     * */
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
    /*
   * make a relation between user model
   * */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    /*
   * its an alias of user relation
   * */
    public function sender()
    {
        return $this->user();
    }
}
