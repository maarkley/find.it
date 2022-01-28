<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('auth/{social}', 'AuthSocialController@redirectToProvider')->where('social','facebook');
Route::get('auth/{social}/callback', 'AuthSocialController@handleProviderCallback')->where('social','facebook');
