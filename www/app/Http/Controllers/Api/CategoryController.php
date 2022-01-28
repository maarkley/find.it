<?php namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\ReportRequest;
use App\Http\Controllers\ApiController;

class CategoryController extends ApiController
{
	public function __construct()
	{
		$this->middleware('jwt.auth', ['except' => ['index']]);
	}
	 /**
 	 * @SWG\Get(
 	 *     path="/category",
 	 *     tags={"Kategorie"},
 	 *     summary="Lista kategorii",
 	 *     @SWG\Response(
 	 *     		response=200,
 	 *          description="ResponseSuccess",
 	 *          ref="$/responses/ResponseSuccess",
 	 *     		@SWG\Schema(
 	 *             	@SWG\Property(
 	 *              	property="data",
 	 *                 	@SWG\Items(ref="#/definitions/Category")
 	 *             	)
 	 *   		)
 	 *   	)
 	 * )
 	 */
    public function index()
    {
		$report = Category::with('reports')->get();
		return $this->showAll($report, 'Dane pobrane prawidłowo');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
