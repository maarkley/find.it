<?php

namespace App\Http\Resources\Report;

use Illuminate\Http\Resources\Json\Resource;

class ReportResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
			'name' => $this->name,
			'slug' => $this->slug,
			'description' => $this->description,
			'coordinate' => [
				'lat' => $this->coordinate['lat'],
				'lng' => $this->coordinate['lng']
			],
			'category' => $this->category,
			'time' => $this->created_at->diffForHumans()
		];
    }
	public function with($request)
    {
        return [
			'success' => true
        ];
    }
}
