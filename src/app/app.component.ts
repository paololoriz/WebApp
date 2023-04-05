import {Component} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
Chart.register(...registerables);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public receivedData = [];
  public badQuality = false;
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

  sendToServer(data : any){
    try{
      var url = 'https://api.example.com/classification';
      axios.post(url, data)
        .then(res =>{
          if(res.data === 1){
            this.dot_1 = 'grey';
            this.dot_2= 'red';
            this.numOfRed++;
          }else{
            this.numOfRed = 0;
            this.dot_1 = 'green';
            this.dot_2 = 'grey';
          }
          if(this.numOfRed === 4){
            alert('ALLARME!')
          }
        })
        .catch(error =>{
          console.log(error)
        });
    }catch (e) {
      console.log(e);
    }
    return {};
  };

  async checkQuality(){
    var data = {};
    var url = 'https://api.example.com/checkQuality';
    const response = await fetch(url)
    var res = await response.json();
    if(res ==="bad"){
      this.badQuality = true;
    }else{
      setInterval(<any | Function>this.sendToServer({}), 4000)
    }
  }

  checkFunction(){
    var a = true;
     var url = 'https://api.example.com/classification';
      axios.post(url, data)
        .then(res =>{
          if(a){
            return 'ok'
          }else{
            return 'no';
          }
        })
        .catch(error =>{
          console.log(error)
        });
    }catch (e) {
      console.log(e);
    }
  }




}
