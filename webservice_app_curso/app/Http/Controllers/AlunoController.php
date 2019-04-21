<?php

namespace App\Http\Controllers;

use App\Aluno;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AlunoController extends Controller
{
    /** Variável armazena o Token JWT */
    protected $jwt;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
        $this->middleware('auth:api',[
            'except'=>['autenticaAluno','cadastrarAluno','getAluno']
        ]);
    }

    /**
     * Método que realiza a autenticação do Aluno e retorna
     * o token JWT
     */
    public function autenticaAluno(Request $request){
        $this->validate($request,[
            'email'=> 'required',
            'password' => 'required'
        ]);       
        if(!$token = $this->jwt->claims(['email'=>$request->email])->attempt($request->only('email','password'))){
            return response()->json('bad request');            
        }

        return response()->json(compact('token'));
    }

    /**
     * Método que retorna os dados do Aluno autenticado 
     * realizando a busca através do token retornado no método autenticaAluno
     */
    public function mostraAlunoAutenticado(){
        $aluno = Auth::user();
        return response()->json($aluno);
    }

    /**
     * Método criado para efetuar o Cadastro do Aluno
     */

    public function cadastrarAluno(Request $request){

        $this->validate($request,[
            'cpf' =>'required|unique:alunos,cpf',
            'nome'=>'required|min:5',
            'endereco'=>'required',
            'estado'=>'required',
            'municipio'=>'required',
            'telefone'=>'required',
            'email'=>'required|email|unique:alunos,email',
            'password'=>'required'
        ]);

        $aluno = new Aluno;
        $aluno->cpf = $request->cpf; 
        $aluno->nome = $request->nome;
        $aluno->endereco = $request->endereco;
        $aluno->estado = $request->estado;
        $aluno->municipio = $request->municipio;
        $aluno->telefone = $request->telefone;
        $aluno->email = $request->email;
        $aluno->password = Hash::make($request->password);       
        
        $aluno->save();
        return response()->json($aluno);
        
    }

   /**
    * Método que efetua a consulta dos dados do Aluno realizando a busca através do cpf
    */
    public function getAluno(Request $request){
        
        $this->validate($request,[
            'cpf' => 'required'
        ]);

        $cpf =$request->cpf; 
         print_r( var_dump(Aluno::where('cpf',$cpf)->first()));      
        return response()->json(Aluno::where('cpf',$cpf)->first());
    }

    /**
     * Efetua o logout do aluno, incluindo o token em uma  'lista negra'
     * invalidando o mesmo.
     */
    public function alunoLogout(){
        Auth::logout();
        return response()->json("Logout efetuado com sucesso!");

    }

}
