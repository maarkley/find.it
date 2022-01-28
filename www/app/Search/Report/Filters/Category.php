<?php namespace App\Search\Report\Filters;

class Category
{
	public static function apply($builder, $value)
	{
		return $builder->whereHas('category', function ($q) use ($value) {
			$q->where('categories.name', $value);
          });
	}
}
