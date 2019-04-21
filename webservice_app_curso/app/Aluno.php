<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Tymon\JWTAuth\Contracts\JWTSubject;
/** Model Aluno */
class Aluno extends Model implements AuthenticatableContract, AuthorizableContract,JWTSubject
{
    use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    /** Campos que serão exibidos em consulta */    
    protected $fillable = [
        'cpf','nome', 'endereco', 'estado','municipio','telefone','email'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

    /** campos que não retornarão em uma consulta */ 
    protected $hidden = [
        'password'
    ];

    /**
     * Obtém o identificador que será armazenado na reivindicação do Claim do JWT
     */
    public function getJWTIdentifier(){
        return $this->getKey();
    }
    
    /**
     * Retorna um array de valor de chave, 
     * contendo quaisquer declarações personalizadas a serem adicionadas ao JWT.     * 
     */
    public function getJWTCustomClaims(){
        return [];
    }
}
