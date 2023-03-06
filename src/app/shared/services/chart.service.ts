import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartData } from '../interfaces/chart-data.interface';
import { ChartResponseData, Result } from '../interfaces/chart.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  baseURL = environment.baseApiURL;

  constructor(private http: HttpClient) {}
  
  getData(company: string): Observable<ChartData[]> {

    return this.http.get<ChartResponseData>(this.baseURL+ company)
      .pipe(
        map((result: ChartResponseData )=>this.formatResults(result.chart.result[0]))
      )
  }

  formatResults(result: Result): ChartData[] {
    const timestamps = result.timestamp.slice(-30);
    const quotes = result.indicators.quote[0].open.slice(-30);

    const formatedResult = quotes.map((el, index)=>{
      return {
        day: index+1,
        timestamp: parseInt(timestamps[index] + '000') ,
        price: el,
        variation: (el - quotes[index-1])/quotes[index-1],
        firstDateVariation: (el - quotes[0])/quotes[0]
      }
    })
    
    return formatedResult;
  }
}
