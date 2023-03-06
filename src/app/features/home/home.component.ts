import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartData } from 'src/app/shared/interfaces/chart-data.interface';

import { ChartService } from 'src/app/shared/services/chart.service';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['day','timestamp', 'price', 'variation', 'firstDateVariation'];
  dataSource: ChartData[] | undefined;
  public chart: any;

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.getData('PETR4.SA');
  }
  
  getData(company: string): void {
    this.chartService.getData(company).subscribe(data=>{
      this.dataSource = data;
      this.createChart();
    })
  }

  createChart() {
    const labels = this.dataSource?.map((item) => {
      return new DatePipe('pt-BR').transform(item.timestamp, 'HH:mm');
    });

    const data = this.dataSource?.map((item) => {
      return item.price;
    });

    this.chart = new Chart("MyChart", {
      type: 'line', 
      data: {
        labels,
	       datasets: [
          {
            label: "Preço",
            data,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

}
