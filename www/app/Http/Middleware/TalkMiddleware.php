<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;

use App\Facades\Talk;


class TalkMiddleware
{
	public function handle($request, Closure $next, $guard = null)
    {
        if (JWTAuth::user()) {
            Talk::setAuthUserId(JWTAuth::user()->id);
        }
        return $next($request);
    }
}
