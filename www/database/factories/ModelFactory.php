<?php
use App\User;
use App\Models\Category;
use App\Models\Report;
use Faker\Generator as Faker;

$factory->define(Category::class, function (Faker $faker) {
    return [
		'name' => $faker->name,
    ];
});

$factory->define(Report::class, function (Faker $faker) {
	$name = $faker->name;
    return [
		'user_id' => User::all()->random()->id,
		'category_id' => Category::all()->random()->id,
		'name' => $name,
		'description' => $faker->text,
		'slug' => str_slug($name),
		'coordinate' => array('lat' => $faker->latitude(53.4, 53.5), 'lng' =>$faker->longitude(14.5,14.6) ),
		'created_at' => $faker->dateTimeThisMonth(),
    ];
});

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
    ];
});
