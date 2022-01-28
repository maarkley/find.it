<?php namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Mockery\Exception;
use Validator;
/**
 * @resource Rejestracja
 */
class RegisterController extends ApiController
{
	/**
	 *
	 * @param  Request $request [description]
	 * @param  $name [description]
	 * @return [type]           [description]
	 */
	public function register(Request $request)
    {
        $validator =  Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|between:6,255',
			'password_confirmation' => 'required|between:6,255|same:password',
        ]);

        if ($validator->fails()) {
			return $this->errorResponse($validator->errors(), 422);
        }

        $request->merge(['password' => Hash::make($request->password)]);
        try {
            $user = User::create($request->all());
			return $this->showOne($user, __('massages.register.success'));
        } catch (Exception $e) {
			return $this->errorResponse(__('massages.register.error'), 409);
        }

    }
}
