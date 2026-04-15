import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimezonesService {

  constructor() { }

  public adjustForTimezoneStr(date : string){
    let offset = new Date(Date.now()).getTimezoneOffset();
    
    return this.addMinutes(new Date(date), -offset);
  }

  public adjustForTimezone(date : Date){
    let offset = new Date(Date.now()).getTimezoneOffset();
    
    return this.addMinutes(date, -offset);
  }

  public addMinutes(date : Date, minutes : number){
    return new Date(date.getTime() + minutes * 60000);
  }
  
  public dateDifferenceInDays(dateInitial : Date, dateFinal : Date) : number{
    return ((dateFinal.valueOf()) - (dateInitial.valueOf())) / (24*60*60*1000);
  }

  public findNonWorkingDays(dateInitial : Date, dateFinal : Date) : Date[]{

    const firstDay = dateInitial.valueOf();
    const lastDay = dateFinal.valueOf();
    const msInDay = 1000*60*60*24; // milliseconds in 1 day
    let weekendDays = [];
    for(let i = firstDay; i < lastDay + msInDay; i += msInDay){
      const currentDay = new Date(i);
      const dayOfWeek = currentDay.getDay();
      const sunday = 0;
      const saturday = 6;
      if(dayOfWeek == sunday || dayOfWeek == saturday){
        weekendDays.push(currentDay);
      }
    }
    return weekendDays;
  }

  public isSameday(a : Date, subjectDay: Date){
    return a.getDate() == subjectDay.getDate() && a.getMonth() == subjectDay.getMonth()
    && a.getFullYear() == subjectDay.getFullYear();
      
  }

  public dateDiff(a : string, b : string){
    let c = this.adjustForTimezoneStr(a).getDate();
    let d = this.adjustForTimezoneStr(b).getDate();
    return c - d;
  }

  public subtractDays(i : number ){
    let n = new Date(Date.now());
    n.setHours(0,1,0,0);
    let ms = n.valueOf()
    const msInDay = 24 * 60 * 60 * 1000;
    return new Date(ms - msInDay*i);
  }

  public subtractDaysFromDateTime(i : number, d : Date){
    let ms = d.valueOf();
    const msInDay = 24 * 60 * 60 * 1000;
    return new Date(ms - msInDay*i);
  }

  public addDaysToDateTime(i : number, d : Date){
    let ms = d.valueOf();
    const msInDay = 24 * 60 * 60 * 1000;
    return new Date(ms + msInDay*i);
  }
}
