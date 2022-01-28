<?php namespace App\Search\Report\Filters;

class Name
{
    public static function apply($builder, $value)
    {
        return $builder->where('name', 'like', '%'.$value.'%');
    }
}
