<?php namespace App\Http\Controllers\Api;

use JWTAuth;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class UserRaportsController extends ApiController
{
	public function __construct()
	{
		$this->middleware('jwt.auth');
	}
	/**
	 * @SWG\Get(
	 *     path="/user/reports",
	 *     tags={"Użytkownik"},
	 *     summary="Lista raportow użytkownika",
	 *     security={
	 *         {"api_key_security": {} }
	 *     },
	 *     @SWG\Response(
	 *     	  response=200,
	 *          description="ResponseSuccess",
	 *          ref="$/responses/ResponseSuccess",
	 *     	  @SWG\Schema(
	 *             @SWG\Property(
	 *              	property="data",
	 *              	@SWG\Items(ref="#/definitions/Report")
	 *             )
	 *   	  )
	 *     )
	 * )
	 */
    public function index()
    {
		$user = JWTAuth::user()->reports()->with('category')->get();
		return $this->showAll($user, 'Dane pobrane prawidłowo');
    }
}
