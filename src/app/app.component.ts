import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options: any;
  updateOptions: any;

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
    this.data1 = [];
    this.data2 = [];
    this.data3 = [];
    this.data4 = [];
    this.data5 = [];
    this.dot_1 = 'grey';
    this.dot_2 = "green";

    this.now = new Date(2023, 2, 21);
    this.value = Math.random() * 1000;

    for (let i = 0; i < 1000; i++) {
      this.data1.push(this.randomData())
      this.data2.push(this.randomData())
      this.data3.push(this.randomData())
      this.data4.push(this.randomData())
      this.data5.push(this.randomData())
    }

    this.options = {
      legend : {
        data: ['data1','data2','data3','data4','data5'],
        align : 'left'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date = new Date(params.name);
          return date.getDay() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()+' '+date.getHours()+'.'+date.getMinutes()+ ':' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: 'data1',
        type: 'line',
        showSymbol: false,
        emphasis: {
          line: false,
        },
        data: this.data1,
        animationDelay: (idx : any)=>idx*10
      },{
        name: 'data2',
        type: 'line',
        showSymbol: false,
        emphasis: {
          line: false,
        },
        data: this.data2,
        animationDelay: (idx : any)=>idx*10+10
      },{
        name: 'data3',
        type: 'line',
        showSymbol: false,
        emphasis: {
          line: false,
        },
        data: this.data3,
        animationDelay: (idx : any)=>idx*10 +100
      },{
        name: 'data4',
        type: 'line',
        showSymbol: false,
        emphasis: {
          line: false,
        },
        data: this.data4,
        animationDelay: (idx : any)=>idx*10 + 1000
      },{
        name: 'data5',
        type: 'line',
        showSymbol: false,
        emphasis: {
          line: false,
        },
        data: this.data5,
        animationDelay: (idx : any)=>idx*10 + 2000
      }],
      animationEasing : 'elasticOut',
      animationDelayUpdate : (idx : any)=>idx * 5,
    };

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
          data: this.data1
        },
          {
          data: this.data2
        },
          {
          data: this.data3
        },
          {
          data: this.data4
        },
          {
          data: this.data5
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
