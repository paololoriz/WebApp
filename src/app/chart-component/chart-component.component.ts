import {Component, OnInit, ViewChildren} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {Chart, ChartConfiguration, ChartEvent, ChartType} from 'chart.js';
import {default as Annotation} from 'chartjs-plugin-annotation';
import {webSocket} from "rxjs/webSocket";
import {concatAll, throttleTime} from "rxjs/operators";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart-component.component.html',
  styleUrls: ['./chart-component.component.scss']
})
export class ChartComponentComponent implements OnInit {
  private socket$: WebSocketSubject<any> | undefined
  public dataReceived = [];
  private counter = 0;
  private data : any = {
    0 : [],
    1 : [],
    2 : [],
    3 : [],
    'time' : [],
  }
  public lineChartType: ChartType = 'line';
  @ViewChildren(BaseChartDirective) charts?: BaseChartDirective;

  constructor() {
    Chart.register(Annotation);
    //this.socket$ = new WebSocketSubject("ws://localhost:8081");

  }

  ngOnInit() {
  }

  createSocket(){
    this.socket$ = webSocket({
      url: 'ws://localhost:8081',
      deserializer: (e) => e.data.text()
    });

    this.socket$.pipe(
      concatAll()
    ).subscribe({
        complete: () => {
          console.log('complete')
        },
        next: (data: any) => {
          var msg = JSON.parse(data);
          this.data["0"].push(msg.data[0]);
          this.data["1"].push(msg.data[1]);
          this.data["2"].push(msg.data[2]);
          this.data["3"].push(msg.data[3]);
          this.data['time'].push(Date.now().toString())
          this.counter ++;

          if(this.counter === 100){
            this.updateCharts(this.data);
            this.data["0"] = [];
            this.data["1"] = [];
            this.data["2"] = [];
            this.data["3"] = [];
            this.data['time'] = [];

            this.counter = 0;
          }
        },
        error: (error) => {
          console.log(error)
        },
      }
    );
  }


  public lineChartData1: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: '',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgb(0,0,0)',
        pointBackgroundColor: 'rgb(0,0,0)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: []
  };
  public lineChartData2: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
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
  public lineChartData3: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
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
  public lineChartData4: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
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
      point: {
        radius: 0
      },
      line: {
        tension: 0.3
      }
    },
    scales: {
      x: {
        display: false
      },
      // We use this empty structure as a placeholder for dynamic theming.
      y:
        {
          position: 'left',
        }
    },
    plugins: {
      legend: {display: false},
    }
  };

  public updateCharts(valueData : any){
    this.lineChartData1.datasets[0].data = valueData['0'];
    this.lineChartData1.labels = valueData['time'] ;
    // if (this.lineChartData1.datasets[0].data.length > 256) {
    //   this.lineChartData1.datasets[0].data.shift();
    //   this.lineChartData1?.labels?.shift();
    // }
    // @ts-ignore
    this.charts._results[0].update();

    this.lineChartData2.datasets[0].data = valueData['1'];
    this.lineChartData2.labels = valueData['time'];
    // if (this.lineChartData2.datasets[0].data.length > 256) {
    //   this.lineChartData2.datasets[0].data.shift();
    //   this.lineChartData2?.labels?.shift();
    // }
    // @ts-ignore
    this.charts._results[1].update();

    this.lineChartData3.datasets[0].data = valueData['2'];
    this.lineChartData3.labels = valueData['time'];
    // if (this.lineChartData3.datasets[0].data.length > 256) {
    //   this.lineChartData3.datasets[0].data.shift();
    //   this.lineChartData3?.labels?.shift();
    // }
    // @ts-ignore
    this.charts._results[2].update();
    console.log(this.charts);

    this.lineChartData4.datasets[0].data= valueData['3'];
    this.lineChartData4.labels = valueData['time'];
    // if (this.lineChartData4.datasets[0].data.length > 256) {
    //   this.lineChartData4.datasets[0].data.shift();
    //   this.lineChartData4?.labels?.shift();
    // }
    // @ts-ignore
    this.charts._results[3].update();
  }
}
