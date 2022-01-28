<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Transformers\ApiResponse;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use Socialite;
/**
 * @resource Uwierzytelnianie
 */
class LoginController extends Controller
{
	/**
	 * login
	 * @param  Request $request [description]
	 * @return [type]           [description]
	 */
    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        $token = null;
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(ApiResponse::response(null, __('massages.login.error'), 'invalid_email_or_password'), 422);
            }
			$user = JWTAuth::toUser($token);
        } catch (JWTAuthException $e) {
            return response()->json(ApiResponse::response(null, __('massages.login.error'), 'failed_to_create_token'), 500);
        }
        return response()->json(ApiResponse::response(compact('token','user'), __('massages.login.success'), 'success'), 200);
    }

    public function refresh(Request $request){
        $current_token  = JWTAuth::getToken();
        $token          = JWTAuth::refresh($current_token);

        return response()->json(compact('token'));
    }
    public function getAuthUser(Request $request){
        $user = JWTAuth::toUser($request->token);
        return response()->json(ApiResponse::response(array('user'=>$user), __('massages.login.success'), 'success'), 200);
    }


}
