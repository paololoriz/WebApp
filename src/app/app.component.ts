import {Component} from '@angular/core';
import {io} from 'socket.io-client';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {webSocket} from "rxjs/webSocket";
import {concatAll, map} from 'rxjs/operators';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private socket$ : WebSocketSubject<any>
  //private socket$ = webSocket('ws://localhost:8081');
  public datareceived : any[] = [];
  options: any;
  updateOptions: any;
  ctx1 : any;
  ctx2 : any;
  ctx3 : any;
  ctx4 : any;



  // actions = [
  //   {
  //     name: 'Randomize',
  //     handler(chart : any) {
  //       chart.data.datasets.forEach((dataset : any) => {
  //         dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
  //       });
  //       chart.update();
  //     }
  //   },
  //   {
  //     name: 'Add Dataset',
  //     handler(chart : any) {
  //       const data = chart.data;
  //       const dsColor = Utils.namedColor(chart.data.datasets.length);
  //       const newDataset = {
  //         label: 'Dataset ' + (data.datasets.length + 1),
  //         backgroundColor: Utils.transparentize(dsColor, 0.5),
  //         borderColor: dsColor,
  //         data: Utils.numbers({count: data.labels.length, min: -100, max: 100}),
  //       };
  //       chart.data.datasets.push(newDataset);
  //       chart.update();
  //     }
  //   },
  //   {
  //     name: 'Add Data',
  //     handler(chart : any) {
  //       const data = chart.data;
  //       if (data.datasets.length > 0) {
  //         data.labels = Utils.months({count: data.labels.length + 1});
  //
  //         for (let index = 0; index < data.datasets.length; ++index) {
  //           data.datasets[index].data.push(Utils.rand(-100, 100));
  //         }
  //
  //         chart.update();
  //       }
  //     }
  //   },
  //   {
  //     name: 'Remove Dataset',
  //     handler(chart) {
  //       chart.data.datasets.pop();
  //       chart.update();
  //     }
  //   },
  //   {
  //     name: 'Remove Data',
  //     handler(chart) {
  //       chart.data.labels.splice(1, 1); // remove the label first
  //
  //       chart.data.datasets.forEach(dataset => {
  //         dataset.data.pop();
  //       });
  //
  //       chart.update();
  //     }
  //   }
  // ];


  public dot_1 : any;
  public dot_2 : any;
  public numOfRed : number = 0;
  public primaryButton = "btn btn-primary btn-lg";
  public lightButton = "btn btn-light btn-lg";

  constructor() {
    //this.socket$ = new WebSocketSubject("ws://localhost:8081");
    this.socket$ = webSocket({
      url: 'ws://localhost:8081',
      deserializer: (e) => e.data.text()
    });

    this.socket$.pipe(
      concatAll()
    ).subscribe({
        complete: () =>{
          console.log('complete')
        },
        next : (data) =>{
          console.log('Dati ricevuti:');
          console.log(data);
          this.datareceived.push(data);
        },
        error: (error) => {
          console.log(error) },    // errorHandler

      }
    );
  }
  ngOnInit(){

    // @ts-ignore
    this.ctx1 = document.getElementById('myChart1');
    this.ctx2 = document.getElementById('myChart2');
    this.ctx3 = document.getElementById('myChart3');
    this.ctx4 = document.getElementById('myChart4');
    new Chart(this.ctx1, {
      type: 'line',
      data: {
        labels : ['1','2','4','2','2','2','2'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
    new Chart(this.ctx2, {
      type: 'line',
      data: {
        labels : ['1','2','4','2','2','2','2'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
    new Chart(this.ctx3, {
      type: 'line',
      data: {
        labels : ['1','2','4','2','2','2','2'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
    new Chart(this.ctx4, {
      type: 'line',
      data: {
        labels : ['1','2','4','2','2','2','2'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });


    this.dot_1 = 'grey';
    this.dot_2 = "green";

    // const DATA_COUNT = 7;
    // const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};
    //
    // const labels = Utils.months({count: 7});
    // const data = {
    //   labels: labels,
    //   datasets: [
    //     {
    //       label: 'Dataset 1',
    //       data: Utils.numbers(NUMBER_CFG),
    //       borderColor: Utils.CHART_COLORS.red,
    //       backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
    //     },
    //     {
    //       label: 'Dataset 2',
    //       data: Utils.numbers(NUMBER_CFG),
    //       borderColor: Utils.CHART_COLORS.blue,
    //       backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
    //     }
    //   ]
    // };



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

    const data = this.ctx2.data;
    this.ctx1.update()
    this.ctx1.data.datasets[0].data[2] = 50;
    console.log(data);
    this.ctx2.data.labels.push('2');
    data.datasets[0].data.push(22)
    var a = true;
    if(a){
      return 'ok'
    }else{
      return 'no';
    }
  }




}
