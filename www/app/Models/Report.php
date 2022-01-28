<?php namespace App\Models;

use App\User;
use App\Models\Category;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;
use Illuminate\Database\Eloquent\Model;
/**
 * @SWG\Definition(
 *     definition="Report",
 *     required={"category_id", "name", "description", "coordinate"},
 *     @SWG\Property(
 *          property="category_id",
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
 *          property="description",
 *          type="string",
 *          description="",
 *          example="opis"
 *    ),
 *     @SWG\Property(
 *     		property="coordinate",
 *          type="object",
 *          @SWG\Property(property="lat", type="string", example=54.222222),
 *          @SWG\Property(property="lng", type="string", example=16.222222)
 *    )
 * )
 * @SWG\Definition(
 *     definition="ReportSearch",
 *     required={"category", "name"},
 *     @SWG\Property(
 *          property="category",
 *          type="string",
 *          description="",
 *          example="Dokumenty"
 *    ),
 *     @SWG\Property(
 *          property="name",
 *          type="string",
 *          description="",
 *          example="Kunze"
 *    )
 * )
 */
class Report extends Model
{
	use Sluggable;
    use SluggableScopeHelpers;

	protected $table = 'reports';
	protected $primaryKey = 'id';
	protected $fillable = ['user_id', 'category_id', 'name', 'description', 'coordinate'];
	protected $hidden = array('user_id', 'category_id', 'created_at', 'updated_at');
	public $timestamps = true;
	protected $casts = [
		'coordinate' => 'array',
	];
	public function getRouteKeyName()
    {
        return 'slug';
    }
	public function sluggable()
     {
         return [
             'slug' => [
                 'source' => 'name'
             ]
         ];
     }

	public function messages()
	{
		return $this->belongsTo(Message::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function category()
	{
		return $this->belongsTo(Category::class);
	}

}
