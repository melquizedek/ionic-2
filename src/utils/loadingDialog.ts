import { LoadingController } from 'ionic-angular';

export class LoadingHelper {

  loading: any; 

  public constructor(public loadingController: LoadingController) {
    console.log('Account Service');
  }
  
  public showDialog(message: string) {
    this.loading = this.loadingController.create({
        content:message
    });
    this.loading.present(); 
  }  

  public dismissDialog(){
    this.loading.dismiss();
  }

}
