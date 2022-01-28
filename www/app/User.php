<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\ResetPassword as ResetPasswordNotification;
use Tymon\JWTAuth\Contracts\JWTSubject;
/**
 * @SWG\Definition(
 *     definition="Users",
 *     required={"name", "email"},
 *     @SWG\Property(
 *          property="id",
 *          type="integer",
 *          description="",
 *          example=1
 *    ),
 *     @SWG\Property(
 *          property="name",
 *          type="string",
 *          description="",
 *          example="Nazwa"
 *    ),
 *     @SWG\Property(
 *          property="email",
 *          type="string",
 *          description="",
 *          example="opis"
 *    )
 * )
 */
class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [ 'name', 'email', 'password' ];
    protected $hidden = [
        'password', 'remember_token', 'created_at', 'updated_at'
    ];

	public function reports()
    {
        return $this->hasMany('App\Models\Report');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return ['user' => ['id' => $this->id]];
    }
    public function sendPasswordResetNotification($token)
    {
        // Your your own implementation.
        $this->notify(new ResetPasswordNotification($token, $this->getEmailForPasswordReset()));
    }
}
