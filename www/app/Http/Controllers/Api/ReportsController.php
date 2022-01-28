<?php namespace App\Http\Controllers\Api;

use App\Models\Report;
use Illuminate\Http\Request;
use App\Http\Requests\ReportRequest;
use App\Http\Controllers\ApiController;
use Spatie\QueryBuilder\QueryBuilder;

use App\Http\Resources\Report\ReportResource;
use App\Http\Resources\Report\ReportsResource;

class ReportsController extends ApiController
{
	public function __construct()
	{
		$this->middleware('jwt.auth', ['except' => ['index','show']]);
	}
	/**
	 * @SWG\Get(
	 *     path="/reports",
	 *     tags={"Reports"},
	 *     summary="Lista raportow",
	 *     @SWG\Response(
	 *     	  response=200,
	 *          description="ResponseSuccess",
	 *          ref="$/responses/ResponseSuccess",
	 *     	  @SWG\Schema(
	 *             @SWG\Property(
	 *              	property="data",
	 *              	@SWG\Items(ref="#/definitions/Report")
	 *             )
	 *   	  )
	 *     )
	 * )
	 */
    public function index()
    {
		return (new ReportsResource(Report::with('category')->get()))->additional(['message'=>'Dane pobrane prawidłowo']);//->paginate()

		// $report = QueryBuilder::for(Report::class)
		// 	->allowedFilters('name','description')
		// 	->with('category')
		// 	->paginate();
		// $report = Report::with('category')->get();
		// return $this->showAll($report, 'Dane pobrane prawidłowo');
    }

    /**
	* @SWG\Get(
	*     path="/reports/{slug}",
	*     tags={"Reports"},
	*     summary="Pokaż raport",
	*     @SWG\Parameter(
	* 		name="slug",
	* 		in="path",
	* 		required=true,
	* 		type="string",
	* 		description="",
	* 	),
	*     @SWG\Response(
	*     	 response=200,
	*          description="ResponseSuccess",
	*          ref="$/responses/ResponseSuccess",
	*   	)
	* )
	*/
   public function show(Report $report)
   {
	   ReportResource::withoutWrapping();
	   return (
		   new ReportResource($report)
	   )->additional(['message'=>'Dane pobrane prawidłowo']);

	   // $report['category'] = $report->category;
	   // return $this->showOne($report, 'Dane pobrane prawidłowo');
   }

	/**
	 * @SWG\Post(
	 *     path="/reports",
	 *     tags={"Reports"},
	 *     summary="Utworz raport",
	 *     security={
	 *         {"api_key_security": {} }
	 *     },
	 *     @SWG\Parameter(
	 * 			name="body",
	 * 			in="body",
	 *          schema={"$ref": "#/definitions/Report"},
	 * 			required=true,
	 * 			type="string",
	 * 			description="",
	 * 		),
	 *     	@SWG\Response(
	 *          response=200,
	 *          description="ResponseSuccess",
	 *          ref="$/responses/ResponseSuccess",
	 *          @SWG\Schema(
	 *             @SWG\Property(
	 *                 property="data",
	 *                 @SWG\Items(ref="#/definitions/Report")
	 *             )
	 *          )
	 *   	),
	 *     	@SWG\Response(
	 *          response=404,
	 *          description="ResponseError",
	 *          ref="$/responses/ResponseError",
	 *   	)
	 * ),
	 */
    public function store(ReportRequest $request)
    {
		$request->user()->reports()->create($request->only(['category_id', 'name', 'description', 'coordinate']));
		return $this->showAll(Report::with('category')->get(), 'Dane zapisane prawidłowo');
    }

	/**
	 * @SWG\Put(
	 *     path="/reports/{slug}",
	 *     tags={"Reports"},
	 *     summary="Aktualizuj raport",
	 *     security={
	 *         {"api_key_security": {} }
	 *     },
	 *     @SWG\Parameter(
 	 * 		name="slug",
 	 * 		in="path",
 	 * 		required=true,
 	 * 		type="string",
 	 * 		description="",
 	 * 	   ),
	 *     @SWG\Parameter(
     *         name="body",
     *         in="body",
     *         description="",
     *         required=true,
     *         @SWG\Schema(ref="#/definitions/Report"),
     *     ),
	 *     @SWG\Response(
	 *          response=200,
	 *          description="ResponseSuccess",
	 *          ref="$/responses/ResponseSuccess",
	 *          @SWG\Schema(
	 *             @SWG\Property(
	 *                 property="data",
	 *                 @SWG\Items(ref="#/definitions/Report")
	 *             )
	 *          )
	 *   	),
	 *     	@SWG\Response(
	 *          response=404,
	 *          description="ResponseError",
	 *          ref="$/responses/ResponseError",
	 *   	)
	 * ),
	 */
    public function update(Request $request, Report $report)
    {
		$report->fill( $request->only( ['category_id', 'name', 'description', 'coordinate'] ) );
		if ($report->isClean()) {
			return $this->errorResponse('Musisz podac inne dane', 422);
		}
		$report->save();
		return $this->showAll(Report::with('category')->get(), 'Zgłoszenie zapisane prawidłowo');
    }

	/**
	 * @SWG\Delete(
	 *     path="/reports/{slug}",
	 *     tags={"Reports"},
	 *     summary="Skasuj raport",
	 *     security={
	 *         {"api_key_security": {} }
	 *     },
	 *     @SWG\Parameter(
 	* 		name="slug",
 	* 		in="path",
 	* 		required=true,
 	* 		type="string",
 	* 		description="",
 	* 	 ),
	 *     	@SWG\Response(
	 *          response=200,
	 *          description="ResponseSuccess",
	 *          ref="$/responses/ResponseSuccess",
	 *          @SWG\Schema(
	 *             @SWG\Property(
	 *                 property="data",
	 *                 @SWG\Items(ref="#/definitions/Report")
	 *             )
	 *          )
	 *   	),
	 *     	@SWG\Response(
	 *          response=404,
	 *          description="ResponseError",
	 *          ref="$/responses/ResponseError",
	 *   	)
	 * ),
	 */
    public function destroy(Report $report)
    {
		$report->delete();
		return $this->showAll(Report::with('category')->get(), 'Zgłoszenie wykasowane prawidłowo');
    }
}
