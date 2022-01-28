<?php
use App\User;
use App\Models\Category;
use App\Models\Report;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
		factory(User::class)->create([ 'name' => 'Rafał', 'email' => 'r3k1n@tlen.pl', 'password' => bcrypt('woda123') ]);
		factory(User::class,2)->create();
		$categories = array('Dokumenty', 'Klucze', 'Smartfony', 'Ubrania');
		foreach ($categories as $cat) {
			factory(Category::class)->create([
			    'name' => $cat
			]);
		}
		factory(Report::class,20)->create();
    }
}
