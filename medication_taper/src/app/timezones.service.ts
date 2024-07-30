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
}
