<?php
namespace App\Http\Controllers;

use App\Traits\ApiResponser;
use Illuminate\Http\Request;
/**
 * @SWG\Swagger(
 *     basePath="/api",
 *     host=API_HOST,
 *     schemes=API_SCHEMES,
 *     produces={"application/json"},
 *     consumes={"application/json"},
 *          @SWG\Info(
 *              title="Find.IT API",
 *              version="1.0",
 *              description="",
 *              @SWG\Contact(name="Rafał Bieniek",email="rafal@sofine.pl"),
 *              @SWG\License(name="Unlicense")
 *          ),
 *          @SWG\Definition(
 *              definition="Timestamps",
 *              @SWG\Property(
 *                  property="created_at",
 *                  type="string",
 *                  format="date-time",
 *                  description="Creation date",
 *                  example="2017-03-01 00:00:00"
 *              ),
 *              @SWG\Property(
 *                  property="updated_at",
 *                  type="string",
 *                  format="date-time",
 *                  description="Last updated",
 *                  example="2017-03-01 00:00:00"
 *              )
 *          ),
 *          @SWG\Definition(
 *              definition="SendMessage",
 *              @SWG\Property(
 *                  property="user_id",
 *         		type="integer",
 *         		format="int64",
 *                  description="ID uzytkownika",
 *                  example="1"
 *              ),
 *              @SWG\Property(
 *                  property="message",
 *                  type="string",
 *                  description="Wiadomośc"
 *              )
 *          ),
 *          @SWG\Response(
 *              response="ResponseSuccess",
 *              description="the basic response",
 *              @SWG\Schema(
 *              	@SWG\Property(
 *                  	property="success",
 *                  	type="boolean",
 *              	),
 *              	@SWG\Property(
 *                  	property="data",
 *                  	type="object",
 *              	),
 *              	@SWG\Property(
 *                  	property="message",
 *                  	type="string",
 *              	)
 *              )
 *          ),
 *          @SWG\Response(
 *              response="ResponseError",
 *              description="the basic response",
 *              @SWG\Schema(
 *              	@SWG\Property(
 *                  	property="success",
 *                  	type="boolean",
 *                  	example=false
 *              	),
 *              	@SWG\Property(
 *                  	property="message",
 *                  	type="string",
 *              	)
 *              )
 *          ),
 * )
 */
class ApiController extends Controller
{
    use ApiResponser;
}
