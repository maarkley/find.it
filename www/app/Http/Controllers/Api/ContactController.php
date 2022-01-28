<?php namespace App\Http\Controllers\Api;

use App\User;
use App\Facades\Talk;

use JWTAuth;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class ContactController extends ApiController
{
	public function __construct()
	{
		$this->middleware(['jwt.auth', 'talk']);
	}
	/**
	 * @SWG\Post(
	 *   path="/sendMessage",
	 *   tags={"Kontakt"},
	 *   summary="Wyślij wiadomośc do uzytkownika",
	 *   security={
	 *         {"api_key_security": {} }
	 *   },
	 *   @SWG\Parameter(
      *         name="body",
      *         in="body",
      *         description="",
      *         required=true,
      *         @SWG\Schema(ref="#/definitions/SendMessage"),
      *   ),
	 *   @SWG\Response(
	 *   	response=200,
	 *        description="ResponseSuccess",
	 *        ref="$/responses/ResponseSuccess",
	 *        @SWG\Schema(
	 *             @SWG\Property(
	 *                 property="data",
	 *                 @SWG\Items(ref="#/definitions/SendMessage")
	 *             )
	 *        )
	 *   ),
	 *   @SWG\Response(
	 *        response=404,
	 *        description="ResponseError",
	 *        ref="$/responses/ResponseError",
	 *   )
	 * ),
	 */
	public function generateUserMessage(Request $request)
	{
		$messages = Talk::sendMessageByUserId(2, 'Wiadomoś test 2');
		return $this->showOne($messages, 'megage');
	}

	public function getUserMessage()
	{
		$messages = Talk::getInbox();
		return $this->showAll($messages, 'Twoje Wiadomości');
	}

	public function getByIDUserMessage($id)
	{
		$messages = Talk::readMessage($id);
		return $this->showOne($messages, 'Twoje Wiadomości');
	}
}
