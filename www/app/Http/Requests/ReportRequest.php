<?php namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReportRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
	
    public function rules()
    {
        return [
			'category_id' => 'required|integer|exists:categories,id',
			'name' => 'required',
			'description' => 'required',
			'coordinate' => [
				function($attribute, $value, $fail) {
					if (empty($value['lat'])) {
						return $fail('Pole miejsce jest wymagane');
					}
				},
			]
        ];
    }
}
