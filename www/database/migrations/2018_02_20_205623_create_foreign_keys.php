<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Eloquent\Model;

class CreateForeignKeys extends Migration {

	public function up()
	{
		Schema::table('reports', function(Blueprint $table) {
			$table->foreign('user_id')->references('id')->on('users')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('reports', function(Blueprint $table) {
			$table->foreign('category_id')->references('id')->on('categories')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
	}

	public function down()
	{
		Schema::table('reports', function(Blueprint $table) {
			$table->dropForeign('reports_user_id_foreign');
		});
		Schema::table('reports', function(Blueprint $table) {
			$table->dropForeign('reports_category_id_foreign');
		});
	}
}
