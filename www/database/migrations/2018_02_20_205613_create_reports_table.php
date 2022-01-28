<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateReportsTable extends Migration {

	public function up()
	{
		Schema::create('reports', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name');
			$table->text('description')->nullable();
			$table->string('coordinate');
			$table->string('slug')->unique();
			$table->integer('user_id')->unsigned();
			$table->integer('category_id')->unsigned();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('reports');
	}
}
