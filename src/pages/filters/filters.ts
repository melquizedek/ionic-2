import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
import { FilterfieldsPagePage } from '../../pages/filterfields/filterfields';
import {FilterbranchPagePage} from '../../pages/filterbranch/filterbranch';
import {FilterspecialtyPagePage} from '../../pages/filterspecialty/filterspecialty';
/*
  Generated class for the FiltersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html'
})
export class FiltersPagePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPagePage');
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
onFilterfieldsPagePage(){
  let modal=  this.modalCtrl.create(FilterfieldsPagePage);
  modal.onDidDismiss(data => {
   });
  modal.present();
 }
onFilterbranch(){
  let modal=  this.modalCtrl.create(FilterbranchPagePage);
  modal.onDidDismiss(data => {
   });
  modal.present();
 }
Specialty(){
  let modal= this.modalCtrl.create(FilterspecialtyPagePage);
  modal.onDidDismiss(data => {
   });
  modal.present();
}
}