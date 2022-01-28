<?php namespace App\Models;
use App\User;
use App\Models\Message;

use Illuminate\Database\Eloquent\Model;
class Conversation extends Model
{
    protected $table = 'conversations';
    public $timestamps = true;
    public $fillable = [
        'user_one',
        'user_two',
        'status',
    ];
    /*
     * make a relation between message
     * */
    public function messages()
    {
        return $this->hasMany(Message::class, 'conversation_id')
            ->with('sender');
    }
    /*
     * make a relation between first user from conversation
     * */
    public function userone()
    {
        return $this->belongsTo(User::class,  'user_one');
    }
    /*
   * make a relation between second user from conversation
   * */
    public function usertwo()
    {
        return $this->belongsTo(User::class,  'user_two');
    }
}
