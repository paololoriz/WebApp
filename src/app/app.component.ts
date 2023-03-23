import {Component} from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //private socket$ = webSocket('ws://localhost:8081');

  public dot_1 : any;
  public dot_2 : any;
  public numOfRed : number = 0;
  public primaryButton = "btn btn-primary btn-lg";
  public lightButton = "btn btn-light btn-lg";

  constructor() {

  }
  ngOnInit(){

    this.dot_1 = 'grey';
    this.dot_2 = "green";

  };

  async sendToServer(){
    var data = {};
    var url = 'www.localhost';
    const response = await fetch(url)
    var res = await response.json();
    if(res[0] == 1){
      this.dot_1 = 'grey';
      this.dot_2= 'red';
      this.numOfRed++;
    }else{
      this.numOfRed = 0;
      this.dot_1 = 'green';
      this.dot_2 = 'grey';
    }
    if(this.numOfRed === 5){
      alert('Si sono ripetute 5 red light')
    }
  };

  checkFunction(){
    //DO something...
    var a = true;
    if(a){
      return 'ok'
    }else{
      return 'no';
    }
  }




}
