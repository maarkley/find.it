<?php

namespace App\Providers;

use App\Talk;

use App\Repository\MessageRepository;
use App\Repository\ConversationRepository;

use Illuminate\Support\ServiceProvider;
use Laravel\Lumen\Application as LumenApplication;

class TalkServiceProvider extends ServiceProvider
{

    public function boot()
    {
		if ($this->app instanceof LumenApplication) {
            $this->app->configure('talk');
        }
    }
	protected function registerTalk()
    {
        $this->app->singleton('talk', function ($app) {
            return new Talk($app[ConversationRepository::class], $app[MessageRepository::class]);
        });
        $this->app->alias('talk', Talk::class);
    }

    public function register()
    {
        $this->registerTalk();
    }

    public function provides()
    {
        return [
            'talk',
        ];
    }
}
