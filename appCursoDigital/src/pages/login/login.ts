import { Component } from '@angular/core';
import { NavController,ToastController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import {ViewProvider} from "../../providers/view/view";



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  responseData : any;
  userData = {"email": "","password": ""};
  private AUTHDATA:string  = 'authData';
  private LOGOUT:string  = 'logout';
  msgLogout :any;
  


  constructor(public navCtrl: NavController, public authService:AuthService, public toastCtrl:ToastController, private view:ViewProvider) {
    /** mensagem caso o Aluno efetue o logout */
    const data = JSON.parse(localStorage.getItem(this.LOGOUT));        
    this.msgLogout = data; 
    if(this.msgLogout){
      this.presentToast(this.msgLogout);
    }                
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /** Método que realiza a autenticação do Aluno no aplicativo
   * O mesmo envia por meio do método POST os dados para o Endpoint autenticaAluno
   * e em caso de sucesso o mesmo retorna o token e o aluno é redirecionado para a HomePage 
   */
  login(){
    console.log(JSON.stringify(this.userData));

    if(this.userData.email && this.userData.password){
    let dialog = this.view.processando();
      this.authService.postData(this.userData,'autenticaAluno').then((result) => {
        console.log(`result OK ::: ${result}`);
        this.responseData = result;   
        console.log(this.responseData);
        if(this.responseData!= "bad request"){
            localStorage.setItem(this.AUTHDATA, JSON.stringify(this.responseData));     
            this.navCtrl.setRoot(HomePage);

        }else{
            this.presentToast(" Email ou senha inválidos!");
        }

        dialog.dismissAll();
      }, (err) => {
        console.log(`result ERR ::: ${err}`);
        dialog.dismissAll();
        this.view.exibirMensagem("Error", err);
      });  

    } else{
      this.presentToast(" Por favor informe seu  email e senha!");      
    }
  

  }

  /** Executa a mensagem de validação para o aluno */
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

}
