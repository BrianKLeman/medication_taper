import { Injectable } from '@angular/core';
import { UserCredentialsService } from '../user-credentials.service';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from 'src/urls.service';
import { TimezonesService } from '../timezones.service';

@Injectable({
  providedIn: 'root'
})
export class SleepsService {
  constructor(private httpClient : HttpClient, 
    private user : UserCredentialsService,
    private apiUrls : UrlsService,
    private timezoneService : TimezonesService) { 

  }

  public async getAllForPerson(){
    let x = await this.httpClient.get<ISleeps[]>( this.apiUrls.GetApiURL()+"Api/Sleeps").toPromise();
    return x;
  }

  public async DeleteSleep( sleep : ISleeps){
    let x = await this.httpClient.delete<number>( this.apiUrls.GetApiURL()+"Api/Sleeps", {body : sleep}).toPromise();
    return x;
  }

  public async CreateSleep( sleep : ISleeps){
    let x = await this.httpClient.post<number>( this.apiUrls.GetApiURL()+"Api/Sleeps", sleep).toPromise();
    return x;
  }

  public async UpdateSleep( sleep : ISleeps){
    let x = await this.httpClient.put<number>( this.apiUrls.GetApiURL()+"Api/Sleeps", sleep).toPromise();
    return x;
  }

  public hoursInLast7Days(data : ISleeps[]) : ISleepDay[]{
    let today = new Date(Date.now());

    let days = [];
    for(let i = 0; i < 21; i++){
      let date = this.timezoneService.subtractDays(i);
      let sleepDay = <ISleepDay>{ToDate : date, SumHours: 0};
      sleepDay.SumHours = this.hoursForDay(data, sleepDay);
      days.push(sleepDay);
    }

    return days;
  }

  public hoursForDay(data : ISleeps[], s : ISleepDay){
    let sum = 0;
    for(let d of data){
      if(this.IsSameDay(d, s)){
        sum += d.Hours;
      }
    }
    return sum;
  }

  private IsSameDay(d :ISleeps, s : ISleepDay) : boolean{
    let bod = s.ToDate.valueOf();
    let b = s.ToDate; b.setHours(0,0,0,0);
    bod = b.valueOf();
    let e = s.ToDate;
    e.setHours(23,59,59,999);
    let eod = e.valueOf();
    let sleep = new Date(d.ToDate).valueOf();
    return sleep >= bod && sleep < eod;
  }
}

export interface ISleeps{
  Id : number,
  Hours : number,
  PersonID: number,
  CreatedDate: string,
  FromDate :  string,
  ToDate: string
}

export interface ISleepDay{
  ToDate : Date,
  SumHours : number
}