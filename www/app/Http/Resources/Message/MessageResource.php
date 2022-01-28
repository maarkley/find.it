<?php namespace App\Http\Resources\Message;

use Illuminate\Http\Resources\Json\Resource;

class MessageResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
			'id' => $this->id,
			'conversation_id' => $this->conversation_id,
			'sender' => $this->sender,
			'message' => $this->message,
			'time' => $this->created_at->diffForHumans()
		];
    }
	public function with($request)
    {
        return [
			'success' => true
        ];
    }
}
