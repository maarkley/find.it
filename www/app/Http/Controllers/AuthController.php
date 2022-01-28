<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ApiController;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class AuthController extends ApiController
{

    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login']]);
    }
	/**
	 * @SWG\Post(
	 *     path="/auth/login",
	 *     tags={"Autoryzacja"},
	 *     summary="Logowanie",
	 *   @SWG\Parameter(
     *     name="email",
     *     in="query",
     *     description="The user name for login",
     *     required=true,
     *     type="string"
     *   ),
     *   @SWG\Parameter(
     *     name="password",
     *     in="query",
     *     description="The password for login in clear text",
     *     required=true,
     *     type="string"
     *   ),
	 *     @SWG\Response(
	 *     		response=200,
	 *          description="ResponseSuccess",
	 *          ref="$/responses/ResponseSuccess"
	 *   	),
	 *     	@SWG\Response(
	 *          response=401,
	 *          description="ResponseError",
	 *          ref="$/responses/ResponseError",
	 *   	)
	 * )
	 */
    public function login(AuthRequest $request)
    {
        $credentials = $request->only('email', 'password');
        if (! $token = auth()->attempt($credentials)) {
			return $this->errorResponse(__('massages.login.error'), 401);
        }
        return $this->successResponse($this->respondWithToken($token), __('massages.login.success'));
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
	 public function me()
     {
 		$current_token  = JWTAuth::getToken();
 		$user = JWTAuth::toUser($current_token);
		return $this->successResponse(['user'=>$user],  __('massages.login.success'));
     }

	 /**
 	 * @SWG\Get(
 	 *     path="/auth/logout",
 	 *     tags={"Autoryzacja"},
 	 *     summary="Wylogowanie",
	 *     security={
	 *         {"api_key_security": {} }
	 *     },
 	 *     @SWG\Response(
 	 *     		response=200,
 	 *          description="ResponseSuccess",
 	 *          ref="$/responses/ResponseSuccess"
 	 *   	),
 	 *     	@SWG\Response(
 	 *          response=401,
 	 *          description="ResponseError",
 	 *          ref="$/responses/ResponseError",
 	 *   	)
 	 * )
 	 */
    public function logout()
    {
        auth()->logout();
		return $this->successResponse(null,  __('massages.login.loggedOut'));
    }

	/**
	* @SWG\Get(
	*     path="/auth/refresh",
	*     tags={"Autoryzacja"},
	*     summary="Reset tokena",
	*     security={
	*         {"api_key_security": {} }
	*     },
	*     @SWG\Response(
	*     		response=200,
	*          description="ResponseSuccess",
	*          ref="$/responses/ResponseSuccess"
	*   	),
	*     	@SWG\Response(
	*          response=401,
	*          description="ResponseError",
	*          ref="$/responses/ResponseError",
	*   	)
	* )
	*/
    public function refresh()
    {
		$token = auth()->refresh();
		return $this->successResponse($this->respondWithToken($token), __('massages.login.success'));
    }


    protected function respondWithToken($token)
    {
		$data = [
			'access_token' => $token,
			'token_type' => 'bearer',
			'expires_in' => auth()->factory()->getTTL() * 60,
			'user' => auth()->user()
		];
		return $data;
    }
}
