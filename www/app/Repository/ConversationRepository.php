<?php namespace App\Repository;

use App\Models\Conversation;

use SebastianBerc\Repositories\Repository;

use App\Http\Resources\Message\MessageResource;

class ConversationRepository extends Repository
{
    /*
     * this method is default method for repository package
     * */
    public function takeModel()
    {
        return Conversation::class;
    }
    /*
     * check this given user is exists
     * */
    public function existsById($id)
    {
        $conversation = $this->find($id);
        if ($conversation) {
            return true;
        }
        return false;
    }
    /*
     * check this given two users is already make a conversation
     * */
    public function isExistsAmongTwoUsers($user1, $user2)
    {
        $conversation = Conversation::where('user_one', $user1)
            ->where('user_two', $user2);
        if ($conversation->exists()) {
            return $conversation->first()->id;
        }
        return false;
    }
    /*
     * check this given user is involved with this given $conversation
     * */
    public function isUserExists($conversationId, $userId)
    {
        $exists = Conversation::where('id', $conversationId)
            ->where(function ($query) use ($userId) {
                $query->where('user_one', $userId)->orWhere('user_two', $userId);
            })
            ->exists();
        return $exists;
    }
    /*
     * retrieve all message thread without soft deleted message with latest one message and
     * sender and receiver user model
     * */
    public function threads($user, $order, $offset, $take)
    {
        $conv = new Conversation();
        $conv->authUser = $user;
        $msgThread = $conv->with(['messages' => function ($q) use ($user) {
            return $q->where(function ($q) use ($user) {
                $q->where('user_id', $user)
					->where('deleted_from_sender', 0);
            })->orWhere(function ($q) use ($user) {
                $q->where('user_id', '!=', $user);
                $q->where('deleted_from_receiver', 0);
            })
            ->latest();
        },'messages.sender', 'userone', 'usertwo'])
            ->where('user_one', $user)
            ->orWhere('user_two', $user)
            ->offset($offset)
            ->take($take)
            ->orderBy('updated_at', $order)
            ->get();
        $threads = [];
        foreach ($msgThread as $thread) {
            $collection = (object) null;
            $conversationWith = ($thread->userone->id == $user) ? $thread->usertwo : $thread->userone;
            $collection->thread = new MessageResource($thread->messages->first());
            $collection->withUser = $conversationWith;
            $threads[] = $collection;
        }
        return collect($threads);
    }
    /*
     * retrieve all message thread with latest one message and sender and receiver user model
     * */
    public function threadsAll($user, $offset, $take)
    {
        $msgThread = Conversation::with(['messages' => function ($q) use ($user) {
            return $q->latest();
        }, 'userone', 'usertwo'])
            ->where('user_one', $user)->orWhere('user_two', $user)->offset($offset)->take($take)->get();
        $threads = [];
        foreach ($msgThread as $thread) {
            $conversationWith = ($thread->userone->id == $user) ? $thread->usertwo : $thread->userone;
            $message = $thread->messages->first();
            $message->user = $conversationWith;
            $threads[] = $message;
        }
        return collect($threads);
    }
    /*
     * get all conversations by given conversation id
     * */
    public function getMessagesById($conversationId, $userId, $offset, $take)
    {
        return Conversation::with(['messages' => function ($query) use ($userId, $offset, $take) {
            $query->where(function ($qr) use ($userId) {
                $qr->where('user_id', '=', $userId)
                    ->where('deleted_from_sender', 0);
            })
            ->orWhere(function ($q) use ($userId) {
                $q->where('user_id', '!=', $userId)
                    ->where('deleted_from_receiver', 0);
            });
            $query->offset($offset)->take($take);
        }])->with(['userone', 'usertwo'])->find($conversationId);
    }
    /*
     * get all conversations with soft deleted message by given conversation id
     * */
    public function getMessagesAllById($conversationId, $offset, $take)
    {
        return $this->with(['messages' => function ($q) use ($offset, $take) {
            return $q->offset($offset)
                ->take($take);
        }, 'userone', 'usertwo'])->find($conversationId);
    }
}
