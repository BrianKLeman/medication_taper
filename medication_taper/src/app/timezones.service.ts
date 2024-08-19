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

  private addMinutes(date : Date, minutes : number){
    return new Date(date.getTime() + minutes * 60000);
  }
  
  public dateDifferenceInDays(dateInitial : Date, dateFinal : Date) : number{
    return ((dateFinal.valueOf()) - (dateInitial.valueOf())) / 86_400_000;
  }

  public dateDiff(a : string, b : string){
    let c = this.adjustForTimezoneStr(a).getDate();
    let d = this.adjustForTimezoneStr(b).getDate();
    return c - d;
  }
}
