import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service/auth-service';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  

  public static token :any;
  responseData: any;
  private AUTHDATA:string  = 'authData';
  private LOGOUT:string  = 'logout';
 

  appMenuItems: Array<MenuItem>;

  // pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public authService:AuthService) {
    this.initializeApp();    
    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'}     
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  /** 
   * Este método efetua o logout do aluno. 
   * Assim que o mesmo é acionado é realizado através do método POST 
   * o envio do Token para que o mesmo seja invalidado e a sessão do aluno 
   * seja encerrada.
   */
  logout(){
    const token =JSON.parse(localStorage.getItem(this.AUTHDATA));
    // console.log(token);
    this.authService.postData(token,'logout').then((result) => {
        this.responseData = result; 
        localStorage.setItem(this.LOGOUT, JSON.stringify(this.responseData));   
        // console.log(this.responseData);
        this.nav.setRoot(LoginPage);           
    }, (err) => {
         // Error log
    });

  }


}
