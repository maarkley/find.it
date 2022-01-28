<?php namespace App\Http\Controllers\Api;

use App\Models\Report;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

use App\Search\Report\ReportSearch;

class SearchController extends ApiController
{
	/**
	 * @SWG\Post(
	 *   path="/search",
	 *   tags={"Szukaj"},
	 *   summary="Szukaj",
	 *   @SWG\Parameter(
	 * 		name="body",
	 * 		in="body",
	 *  		schema={"$ref": "#/definitions/ReportSearch"},
	 * 		required=true,
	 * 		type="string",
	 * 		description="",
	 * 	),
	 *   @SWG\Response(
	 *   	response=200,
	 *        description="ResponseSuccess",
	 *        ref="$/responses/ResponseSuccess",
	 *        @SWG\Schema(
	 *             @SWG\Property(
	 *                 property="data",
	 *                 @SWG\Items(ref="#/definitions/SendMessage")
	 *             )
	 *        )
	 *   ),
	 *   @SWG\Response(
	 *        response=404,
	 *        description="ResponseError",
	 *        ref="$/responses/ResponseError",
	 *   )
	 * ),
	 */
	public function filter(Request $request)
	{
		return $this->showAll(ReportSearch::apply($request), 'Dane pobrane');
	}
}
