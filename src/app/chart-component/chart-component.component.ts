import { Component, OnInit,ViewChild  } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { default as Annotation } from 'chartjs-plugin-annotation';
import {webSocket} from "rxjs/webSocket";
import {concatAll} from "rxjs/operators";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart-component.component.html',
  styleUrls: ['./chart-component.component.scss']
})
export class ChartComponentComponent implements OnInit {
  private socket$ : WebSocketSubject<any>

  constructor() {
    Chart.register(Annotation);
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
        next : (data : any) =>{
          //console.log('Dati ricevuti:');
          var msg = JSON.parse(data);
           console.log(msg.data[0]);
           console.log(Date.now().toString());
          this.lineChartData1.datasets[0].data.push(msg.data[0]);
          this.lineChartData1?.labels?.push(Date.now().toString());
          if(this.lineChartData1.datasets[0].data.length > 300){
            this.lineChartData1.datasets[0].data.splice(1,1);
            this.lineChartData1?.labels?.splice(1,1);
          }
          this.chart1?.update();

          this.lineChartData2.datasets[0].data.push(msg.data[1]);
          this.lineChartData2?.labels?.push(Date.now().toString());
          if(this.lineChartData2.datasets[0].data.length > 300){
            this.lineChartData2.datasets[0].data.shift();
            this.lineChartData2?.labels?.splice(1,1);
          }
          this.chart2?.update();

          this.lineChartData3.datasets[0].data.push(msg.data[2]);
          this.lineChartData3?.labels?.push(Date.now().toString());
          if(this.lineChartData2.datasets[0].data.length > 300){
            this.lineChartData3.datasets[0].data.splice(1,1);
            this.lineChartData3?.labels?.splice(1,1);       }
          this.chart3?.update();

          this.lineChartData4.datasets[0].data.push(msg.data[3]);
          this.lineChartData4?.labels?.push(Date.now().toString());
          if(this.lineChartData2.datasets[0].data.length > 300) {
            this.lineChartData4.datasets[0].data.splice(1,1);
            this.lineChartData4?.labels?.splice(1,1);
          }
          this.chart4?.update();
        },
        error: (error) => {
          console.log(error) },    // errorHandler
  //{"type":"eeg","data":[-13.703383,8.95175,42.080486,-35.08723]}
      }
    );
  }

  ngOnInit(): void {
  }

  public lineChartData1: ChartConfiguration['data'] = {
    datasets: [
      {
        data:  [  ],
        //label: '',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgb(0,0,0)',
        pointBackgroundColor: 'rgb(0,0,0)',
        //pointBorderColor: '#fff',
        //pointHoverBackgroundColor: '#fff',
        //pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        //fill: 'origin',
      }
    ],
    labels:  [  ]
  };
  public lineChartData2: ChartConfiguration['data'] = {
    datasets: [
      {
        data:  [  ],
        label: '',
        backgroundColor:'rgba(0,0,0,0)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels:  [  ]
  };
  public lineChartData3: ChartConfiguration['data'] = {
    datasets: [
      {
        data:  [  ],
        label: '',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels:  [  ]
  };
  public lineChartData4: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [  ],
        label: '',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point :{
        radius : 0
      },
      line: {
        tension: 1
      }
    },
    scales: {
      x : {
        display: false
      },
      // We use this empty structure as a placeholder for dynamic theming.
      y:
        {
          position: 'left',
        }
    },
    plugins: {
      legend: { display: false },
    }
  };

  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart1?: BaseChartDirective;
  @ViewChild(BaseChartDirective) chart2?: BaseChartDirective;
  @ViewChild(BaseChartDirective) chart3?: BaseChartDirective;
  @ViewChild(BaseChartDirective) chart4?: BaseChartDirective;

  public hideOne(): void {
    const isHidden = this.chart1?.isDatasetHidden(1);
    this.chart1?.hideDataset(1, !isHidden);
  }
  public pushOne(): void {
    this.lineChartData1.datasets.forEach((x, i) => {
      const num = 2;
      x.data.push(num);
    });
    this.lineChartData1?.labels?.push(`Label ${ this.lineChartData1.labels.length }`);

    this.chart1?.update();
  }

}
