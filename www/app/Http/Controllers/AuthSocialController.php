<?php namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use Tymon\JWTAuth\Exceptions\JWTException;
use Socialite;
use JWTAuth;
/**
 * @resource Uwierzytelnianie Social Media
 */
class AuthSocialController extends ApiController
{
	public function redirectToProvider($social='facebook')
    {
        return Socialite::driver($social)->stateless()->redirect();
    }

    public function handleProviderCallback($social)
    {
        $userSocial = Socialite::driver($social)->stateless()->user();

        $user = User::firstOrNew(['email' => $userSocial->getEmail()]);
        if (!$user->id) {
            $user->fill(["name" => $userSocial->getName(),"password"=>bcrypt(str_random(6))]);
            $user->save();
        }
		$token = JWTAuth::fromUser($user);

        return $this->successResponse([
            'user'  => $user,
            'userSocial'  => $userSocial,
            'token' => $token,
        ], __('massages.login.success'));
    }
}
