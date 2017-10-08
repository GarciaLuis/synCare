import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the ParticipatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-participate',
  templateUrl: 'participate.html',
})
export class ParticipatePage {

  info: any;
  uname: any;

  percent: number;
  requestInfo: any;

  requesterName: any;
  requestedAmount: number;

  requestedCatergory: any;
  currency: any;

  contribution: number;

  private urlParameters: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataProvider, public http: Http) {

    this.requestInfo = this.getRequesterInfo();
    this.dataService.getRemoteData();

    this.http.get('http://home.loosescre.ws/~keith/synCare/server.php?command=users').map(res => res.json()).subscribe(data => {

    //  this.uname= this.navPara.get('title');
    this.uname = 'luis';

     data.forEach(r => {
       if(r.username == this.uname)
         {
           this.percent=r.percent;
           console.log("name: " + r.username);
           console.log("percent: " + r.percent);

         }
     });


 });

  //console.log(this.navPara.get('title'));

 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticipatePage');
    // console.log(this.navParams.get('title'));
    // console.log("here: " + this.dataService.getRemoteData());

    if (document.URL.indexOf("?") > 0) {

       console.log(document.URL);

	     let splitURL = document.URL.split("?");
	     let splitParams = splitURL[1].split("&");
	     let i: any;
       for (i in splitParams){

         var valuableParam = false;

         let singleURLParam = splitParams[i].split('=');

         console.log(splitParams);

		     if (singleURLParam[0] == "username"){
           this.category = singleURLParam[1];
           valuableParam = true;
         }
		     if (singleURLParam[0] == "amount"){
           this.id = singleURLParam[1];
           valuableParam = true;
         }
         if (singleURLParam[0] == "currency"){
           this.category = singleURLParam[1];
           valuableParam = true;
         }
		     if (singleURLParam[0] == "catergory"){
           this.id = singleURLParam[1];
           valuableParam = true;
         }
         if (singleURLParam[0] == "total"){
           this.id = singleURLParam[1];
           valuableParam = true;
         }

         let urlParameter = {
           'name': singleURLParam[0],
           'value': singleURLParam[1]
         };

         if(valuableParam){
           this.urlParameters.push(urlParameter);
         }

         console.log("url params: " + this.urlParameters);
       }
     }
   }

  backToDashboard(){

    let data = {
      title: 'sudo title',
      information: [
        'name', 'id'
      ],
      time: '10:10am'
    };

    this.navCtrl.push(HomePage, data);
  }

  getUserContribution(){
    // console.log("uid: " + uid);
    // let uid = 0;
    // let data = this.dataService.getRemoteData();
    // this.userData = data[uid];
    // console.log(userData['percent']);
    // return userData['percent'];

    // return userData['name'];
    return this.percent;

  }

  getRequesterInfo(){

    this.http.get('http://home.loosescre.ws/~keith/synCare/server.php?command=getReqs').map(res => res.json()).subscribe(data =>{
      // console.log(data);
      // console.log(data[0]);
      // i is the user index in the response array

      console.log("raw: " + data[0]['realname']);

      let obj = data[0];

      this.requesterName = obj['realname'];
      this.requestedAmount = obj['amount'];

      this.requestedCatergory = obj['category'];

      this.contribution = 2000;

      let currencyType = obj['currency'];


      // requestedAmount: number;

      // this.requestInfo = {'realname': obj['realname'], 'amount': obj['amount']};

      // this.requestInfo = data[0];

      // let i = 0;
      // let jsonData = data[i];


      // jsondata = data[0];
      // console.log(jsonData['username']);
      console.log("RequestInfo: " + this.requestInfo);
      return this.requestInfo;
    });
  }

}