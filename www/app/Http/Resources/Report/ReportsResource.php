<?php

namespace App\Http\Resources\Report;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ReportsResource extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
		return [
            'data' => ReportResource::collection($this->collection)
        ];
    }
	public function with($request)
    {
        return [
			'success' => true
        ];
    }
}
