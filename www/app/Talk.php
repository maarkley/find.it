<?php namespace App;

use App\Repository\MessageRepository;
use App\Repository\ConversationRepository;

class Talk
{
    protected $conversation;
    protected $message;
    protected $authUserId;

    public function __construct(ConversationRepository $conversation, MessageRepository $message)
    {
        $this->conversation = $conversation;
        $this->message = $message;
    }

    /**
     * make two users as serialize with ascending order.
     */
    protected function getSerializeUser($user1, $user2)
    {
        $user = [];
        $user['one'] = ($user1 < $user2) ? $user1 : $user2;
        $user['two'] = ($user1 < $user2) ? $user2 : $user1;

        return $user;
    }

    /**
     * create a new message by using conversationId.
     */
    protected function makeMessage($conversationId, $message)
    {
        $message = $this->message->create([
            'message' => $message,
            'conversation_id' => $conversationId,
            'user_id' => $this->authUserId,
            'is_seen' => 0,
        ]);

        $message->conversation->touch();

        return $message;
    }

    /*
     * Make new message collections to response with formatted data
     */
    protected function makeMessageCollection($conversations)
    {
        if (!$conversations) {
            return false;
        }

        $collection = (object) null;
        if ($conversations->user_one == $this->authUserId || $conversations->user_two == $this->authUserId) {
            $withUser = ($conversations->userone->id === $this->authUserId) ? $conversations->usertwo : $conversations->userone;
            $collection->withUser = $withUser;
            $collection->messages = $conversations->messages;

            return $collection;
        }

        return false;
    }

    /**
     * make new conversation the given receiverId with currently loggedin user.
     */
    protected function newConversation($receiverId)
    {
        $conversationId = $this->isConversationExists($receiverId);
        $user = $this->getSerializeUser($this->authUserId, $receiverId);

        if ($conversationId === false) {
            $conversation = $this->conversation->create([
                'user_one' => $user['one'],
                'user_two' => $user['two'],
                'status' => 1,
            ]);

            if ($conversation) {
                return $conversation->id;
            }
        }

        return $conversationId;
    }

    /**
     * set currently authenticated user id for global usage.
     */
    public function setAuthUserId($id = null)
    {
        if (!is_null($id)) {
            return $this->authUserId = $id;
        }

        return false;
    }

    /*
     * its set user id instantly when you fetch or access data. if you you haven't
     * set authenticated user id globally or you want to fetch work with
     * instant users information, you may use it
     * */
    public function user($id = null)
    {
        if ($this->setAuthUserId($id)) {
            return $this;
        }

        return false;
    }

    /**
     * make sure is this conversation exist for this user with currently loggedin user.
     */
    public function isConversationExists($userId)
    {
        if (empty($userId)) {
            return false;
        }

        $user = $this->getSerializeUser($this->authUserId, $userId);

        return $this->conversation->isExistsAmongTwoUsers($user['one'], $user['two']);
    }

    /**
     * check the given user exist for the given conversation.
     */
    public function isAuthenticUser($conversationId, $userId)
    {
        if ($conversationId && $userId) {
            return $this->conversation->isUserExists($conversationId, $userId);
        }

        return false;
    }

    /**
     * send a message by using converstionid.
     */
    public function sendMessage($conversatonId, $message)
    {
        if ($conversatonId && $message) {
            if ($this->conversation->existsById($conversatonId)) {
                $message = $this->makeMessage($conversatonId, $message);

                return $message;
            }
        }

        return false;
    }

    /**
     * create a new message by using receiverid.
     */
    public function sendMessageByUserId($receiverId, $message)
    {
        if ($conversationId = $this->isConversationExists($receiverId)) {
            $message = $this->makeMessage($conversationId, $message);

            return $message;
        }

        $convId = $this->newConversation($receiverId);
        $message = $this->makeMessage($convId, $message);

        return $message;
    }

    /**
     * fetch all inbox for currently loggedin user with pagination.
     */
    public function getInbox($order = 'desc', $offset = 0, $take = 20)
    {
        return $this->conversation->threads($this->authUserId, $order, $offset, $take);
    }

    /**
     * fetch all inbox with soft deleted message for currently loggedin user with pagination.
     */
    public function getInboxAll($order = 'desc', $offset = 0, $take = 20)
    {
        return $this->conversation->threadsAll($this->authUserId, $order, $offset, $take);
    }

    /**
     * its a alias of getInbox method.
     */
    public function threads($order = 'desc', $offset = 0, $take = 20)
    {
        return $this->getInbox($order, $offset, $take);
    }

    /**
     * its a alias of getInboxAll method.
     */
    public function threadsAll($order = 'desc', $offset = 0, $take = 20)
    {
        return $this->getInboxAll($order, $offset, $take);
    }

    /**
     * fetch all conversation by using coversation id.
     */
    public function getConversationsById($conversationId, $offset = 0, $take = 20)
    {
        $conversations = $this->conversation->getMessagesById($conversationId, $this->authUserId, $offset, $take);

        return $this->makeMessageCollection($conversations);
    }

    /**
     * fetch all conversation with soft deleted messages by using coversation id.
     */
    public function getConversationsAllById($conversationId, $offset = 0, $take = 20)
    {
        $conversations = $this->conversation->getMessagesAllById($conversationId, $offset, $take);

        return $this->makeMessageCollection($conversations);
    }

    /**
     * create a new message by using sender id.
     */
    public function getConversationsByUserId($senderId, $offset = 0, $take = 20)
    {
        $conversationId = $this->isConversationExists($senderId, $this->authUserId);
        if ($conversationId) {
            return $this->getConversationsById($conversationId, $offset, $take);
        }

        return false;
    }

    /**
     * create a new message by using sender id.
     */
    public function getConversationsAllByUserId($senderId, $offset = 0, $take = 20)
    {
        $conversationId = $this->isConversationExists($senderId, $this->authUserId);
        if ($conversationId) {
            return $this->getConversationsAllById($conversationId, $offset, $take);
        }

        return false;
    }

    /**
     * its an alias of getConversationById.
     */
    public function getMessages($conversationId, $offset = 0, $take = 20)
    {
        return $this->getConversationsById($conversationId, $offset, $take);
    }

    /**
     * its an alias of getConversationAllById.
     */
    public function getMessagesAll($conversationId, $offset = 0, $take = 20)
    {
        return $this->getConversationsAllById($conversationId, $offset, $take);
    }

    /**
     * its an alias by getConversationByUserId.
     */
    public function getMessagesByUserId($userId, $offset = 0, $take = 20)
    {
        return $this->getConversationsByUserId($userId, $offset, $take);
    }

    /**
     * its an alias by getConversationAllByUserId.
     */
    public function getMessagesAllByUserId($userId, $offset = 0, $take = 20)
    {
        return $this->getConversationsAllByUserId($userId, $offset, $take);
    }

    /**
     * read a single message by message id.
     */
    public function readMessage($messageId = null)
    {
        if (!is_null($messageId)) {
            $message = $this->message->with(['sender', 'conversation'])->find($messageId);

            if ($message->conversation->user_one == $this->authUserId || $message->conversation->user_two == $this->authUserId) {
                return $message;
            }
        }

        return false;
    }

    /**
     * make a message as seen.
     */
    public function makeSeen($messageId)
    {
        $seen = $this->message->update($messageId, ['is_seen' => 1]);
        if ($seen) {
            return true;
        }

        return false;
    }

    /**
     * get receiver information for this conversation.
     */
    public function getReceiverInfo($conversationId)
    {
        $conversation = $this->conversation->find($conversationId);
        $receiver = '';
        if ($conversation->user_one == $this->authUserId) {
            $receiver = $conversation->user_two;
        } else {
            $receiver = $conversation->user_one;
        }

        $user = new User();

        return $user->find($receiver);
    }

    /**
     * delete a specific message, its a softdelete process. All message stored in db.
     */
    public function deleteMessage($messageId)
    {
        return $this->message->softDeleteMessage($messageId, $this->authUserId);
    }

    /**
     * permanently delete message for this id.
     */
    public function deleteForever($messageId)
    {
        $deleteMessage = $this->message->delete($messageId);
        if ($deleteMessage) {
            return true;
        }

        return false;
    }

    /**
     * delete message threat or conversation by conversation id.
     */
    public function deleteConversations($id)
    {
        $deleteConversation = $this->conversation->delete($id);
        if ($deleteConversation) {
            return $this->message->deleteMessages($id);
        }

        return false;
    }

    /**
     * its an alias of deleteConversations.
     */
    public function deleteThread($id = null)
    {
        return $this->deleteConversations($id);
    }
}
