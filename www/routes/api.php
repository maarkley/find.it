<?php use Illuminate\Http\Request;
/**
 * EXTRA ROUTES
 */
Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');

/**
 * AUTHORIZATION
 */
Route::group(['prefix'=> 'auth'],function() {
	Route::post('register', 'Auth\RegisterController@register')->name('register');
	Route::post('login', 'AuthController@login')->name('login');
	Route::get('logout', 'AuthController@logout')->name('logout');
	Route::get('refresh', 'AuthController@refresh')->name('refresh');
	Route::post('me', 'AuthController@me')->name('me');
});

/**
 * API
 */
Route::group(['namespace' => 'Api'], function() {
	/**
	 * REPORTS
	 */
	Route::resource('reports', 'ReportsController', ['except' => ['create', 'edit']]);
    Route::resource('user/reports', 'UserRaportsController', ['only' => ['index']]);
	Route::resource('category', 'CategoryController', ['except' => ['create', 'edit']]);
	/**
	 * Wyślij Wiadomośc
	 */
 	Route::get('messages', 'ContactController@getUserMessage');
   	Route::get('messages/{id}', 'ContactController@getByIDUserMessage');
 	Route::post('sendMessage', 'ContactController@generateUserMessage');

	Route::post('search', 'SearchController@filter');
});
