<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
/**
 * @SWG\Definition(
 *     definition="Category",
 *     required={"id","name"},
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
 *    @SWG\Property(
 *       property="reports",
 *       @SWG\Items(ref="#/definitions/Report")
 *   )
 * )
 */
class Category extends Model
{

    protected $table = 'categories';
    public $timestamps = false;

	public function reports()
 	{
 		return $this->hasMany(Report::class);
 	}
}
