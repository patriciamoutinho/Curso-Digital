<?php

namespace App\Providers;

use App\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
       
        // Aqui você pode definir como deseja que os usuários sejam autenticados para o seu Lumen
        // application. O retorno de chamada que recebe a instância de solicitação recebida
        // deve retornar uma instância do usuário ou nulo. Você é livre para obter
        // a instância do usuário por meio de um token de API ou qualquer outro método necessário.

        $this->app['auth']->viaRequest('api', function ($request) {
            return \App\Aluno::where('email',$request->input('email'))->first();
        });
    }
}
