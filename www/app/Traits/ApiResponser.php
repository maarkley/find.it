<?php namespace App\Traits;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

trait ApiResponser
{
	protected function successResponse($data, $message, $code = 200)
	{
		$response = [
			'success' => true,
			'message' => $message,
			'data' => $data
		];
        return response()->json($response, $code);
	}
	protected function errorResponse($message, $code)
	{
		return response()->json([
			'success' => false,
			'message' => $message
		], $code);
	}
	protected function showAll(Collection $collection, $message, $code = 200)
	{
		return $this->successResponse($collection, $message, $code);
	}
	protected function showOne(Model $model, $message, $code = 200)
	{
		return $this->successResponse($model, $message, $code);
	}
}
