import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    userDetails : any;
    responseData: any;
    userInfo: any;
    userPostData = {"token":""};
    private AUTHDATA:string  = 'authData'; 
    private USERDATA:string = 'userData'

    /**
     * Após a autenticação do aluno é resgatado o token para que possa ser realizada a 
     * consulta dos dados do aluno. Esta requisição  é efetuada via POST e a consulta é efetuada através 
     * do Endpoint info. 
     */
    constructor(public navCtrl: NavController, public authService:AuthService) {
        const data = JSON.parse(localStorage.getItem(this.AUTHDATA));        
        this.userDetails = data; 
                     
        this.userPostData.token = this.userDetails.token;
        console.log(this.userDetails.token);
        this.authService.postData(this.userDetails,'info').then((result) => {
            this.responseData = result;   
            console.log(this.responseData);
            localStorage.setItem(this.USERDATA, JSON.stringify(this.responseData)); 
            const dataInfo =  JSON.parse(localStorage.getItem(this.USERDATA)); 
            this.userInfo = dataInfo.nome;
            console.log(this.userInfo);    
        }, (err) => {
             // Error log
        });
    } 

        




}
