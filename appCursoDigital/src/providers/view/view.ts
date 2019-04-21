import { Injectable } from '@angular/core';
import {AlertController, Loading, LoadingController} from "ionic-angular";
import {Http} from "@angular/http";

/*
  Generated class for the ViewProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ViewProvider {

  constructor(public http: Http, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    console.log('Hello ViewProvider Provider');
  }

  exibirMensagem(titulo: string, subtitulo: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      buttons:  ["OK"]
    });

    alert.present();
  }

  public processando(dismissOnPageChange = true): Loading {
    return this.loadingCtrl.create({
      content: "Processando..."
      ,dismissOnPageChange: dismissOnPageChange});
  }

}
