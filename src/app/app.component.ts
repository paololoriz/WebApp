import {Component} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options: any;
  updateOptions: any;
  data = [["2000-06-05", -24], ["2000-06-06", 12], ["2000-06-07", -24], ["2000-06-08", 0], ["2000-06-09", 0], ["2000-06-10", 0], ["2000-06-11", 12], ["2000-06-12", 12], ["2000-06-13", -24], ["2000-06-14", -49], ["2000-06-15", -49], ["2000-06-16", -49], ["2000-06-17", -49], ["2000-06-18", -36], ["2000-06-19", -24], ["2000-06-20", 12], ["2000-06-21", -24], ["2000-06-22", 36], ["2000-06-23", 36], ["2000-06-24", 12], ["2000-06-25", -12], ["2000-06-26", 12], ["2000-06-27", -12], ["2000-06-28", -12], ["2000-06-29", 0], ["2000-06-30", 0], ["2000-07-01", 0], ["2000-07-02", -12], ["2000-07-03", 12], ["2000-07-04", -36], ["2000-07-05", 36], ["2000-07-06", 24], ["2000-07-07", 12], ["2000-07-08", 12], ["2000-07-09", 12], ["2000-07-10", 36], ["2000-07-11", 24], ["2000-07-12", 12], ["2000-07-13", -24], ["2000-07-14", -12], ["2000-07-15", 0], ["2000-07-16", 0], ["2000-07-17", 0], ["2000-07-18", -12], ["2000-07-19", -12], ["2000-07-20", -24], ["2000-07-21", -24], ["2000-07-22", -24], ["2000-07-23", -24], ["2000-07-24", -36]];

  private oneDay = 24 * 3600 * 1000;
  private now: any;
  private value: any;
  private data1: any ;
  private data2: any;
  private data3: any;
  private data4: any;
  private data5: any;
  private timer: any;
  public dot_1 : any;
  public dot_2 : any;
  public numOfRed : number = 0;
  public primaryButton = "btn btn-primary btn-lg";
  public lightButton = "btn btn-light btn-lg";

  constructor() {
  }

  ngOnInit(): void {
    this.data1 = this.data;
    this.data2 = [];
    this.data3 = [];
    this.data4 = [];
    this.data5 = [];
    this.dot_1 = 'grey';
    this.dot_2 = "green";

    this.now = new Date(2023, 2, 21);
    this.value = Math.random() * 1000;

    for (let i = 0; i < 1000; i++) {
      // this.data1.push(this.randomData())
      // this.data2.push(this.randomData())
      // this.data3.push(this.randomData())
      // this.data4.push(this.randomData())
      // this.data5.push(this.randomData())
    }

    this.options = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date = new Date(params.name);
          return date.getDay() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + '.' + date.getMinutes() + ':' + params.value[1];
        },
      },
      xAxis:
         {
           type: 'time',
         },
          yAxis: {
            lineStyle:{
              type: 'dashed'
            }
          },
          series: {
            name: 'data1',
            type: 'line',
            showSymbol: false,
            emphasis: {
              line: false,
            },
            data: this.data1,
          },
    }


    this.timer = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        this.data1.shift();
        this.data1.push(this.randomData());
        this.data2.shift();
        this.data2.push(this.randomData());
        this.data3.shift();
        this.data3.push(this.randomData());
        this.data4.shift();
        this.data4.push(this.randomData());
        this.data5.shift();
        this.data5.push(this.randomData());
        console.log(this.data5)
      }

      // update series data:
      this.updateOptions = {
        series: [{
         // data: this.data1
        },
          {
          //data: this.data2
        },
          {
          //data: this.data3
        },
          {
          //data: this.data4
        },
          {
          //data: this.data5
        }]
      };
    }, 1000);
  };

  private randomData() {
    this.now = new Date(this.now.getTime() + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.getDay()+this.now.getMonth()+this.now.getFullYear(),
      value: [
        [this.now.getFullYear(), this.now.getMonth(), this.now.getDay()+1].join('/'), Math.round(this.value)]
    };
  }
  async sendToServer(){
    var data = {};
    var url = '';
    const response = await fetch(url, {
      method : 'POST',
      mode : 'cors',
      cache : 'no-cache',
      credentials : 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    var res = await response.json();
    if(res[0] == 1){
      this.dot_1 = 'grey';
      this.data2 = 'red';
      this.numOfRed++;
    }else{
      this.dot_1 = 'green';
      this.data2 = 'grey';
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
