<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
/** Cadastrar Aluno */
$router->post('/cadastraAluno','AlunoController@cadastrarAluno');

/** Consulta Aluno*/
$router->get('/aluno','AlunoController@getAluno');

/**Autentica Aluno */
$router->post('/autenticaAluno','AlunoController@autenticaAluno');

/** Informações do Aluno autenticado  */
$router->post('/info','AlunoController@mostraAlunoAutenticado');

/** Logout */
$router->post('/logout','AlunoController@alunoLogout');