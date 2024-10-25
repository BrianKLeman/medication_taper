import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISleeps, SleepsService } from '../sleeps-table/sleeps.service';
import { TimezonesService } from '../timezones.service';

@Component({
  selector: 'app-sleeps-form',
  templateUrl: './sleeps-form.component.html',
  styleUrls: ['./sleeps-form.component.css']
})
export class SleepsFormComponent {
 public constructor(@Inject(MAT_DIALOG_DATA) 
        public data: 
        {
          datetime: Date,
          sleep : ISleeps | null
        },
    private service : SleepsService,
    private timeService : TimezonesService){

      if(!data.sleep){
        let now = new Date(Date.now());
        now = this.timeService.adjustForTimezone(now);
        this.currentSleep = this.CreateNewSleep(now);
      } else {
        this.currentSleep = data.sleep;
        
        // I need to correct the date time because the server is adjusting it.
        let rd = this.timeService.adjustForTimezone(new Date(this.currentSleep.CreatedDate));
        this.currentSleep.CreatedDate = rd.toISOString();
        this.setDateAndTime(this.currentSleep.FromDate, this.currentSleep.ToDate);
      }
      
  }

  private CreateNewSleep(now : Date) : ISleeps{
    let ct = now;
    ct.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
    console.log(ct.toISOString());
    let currentNote = <ISleeps> 
    { 
      Id : 0, 
      PersonID : 0, 
      CreatedDate : ct.toISOString(),
      Hours : 0,
      FromDate : "",
      ToDate : ""
    };
    return currentNote;
  }
  public async SaveSleep(){
    this.updateSleep(this.currentSleep);
    if(this.currentSleep?.Id == 0)
      await this.service.CreateSleep(this.currentSleep);      
    else
      await this.service.UpdateSleep(this.currentSleep);
  }  
  
  fromDate : string = "";
  fromTime : string = "";
  currentSleep : ISleeps;

  public changeFromDate(d : string){
    this.fromDate = d;
  }

  public changeFromTime(d : string){
    this.fromTime = d;
  }

  private setDateAndTime(fromDate : string, toDate : string){
        this.fromDate = fromDate.split("T")[0];
        this.fromTime = fromDate.split("T")[1].substring(0,5);

        this.toDate = toDate.split("T")[0];
        this.toTime = toDate.split("T")[1].substring(0,5);
  }

  toDate : string = "";
  toTime : string = "";

  public changeToDate(d : string){
    this.toDate = d;
  }

  private setToTime(d : string){
        this.toTime = d;
  }

  private updateSleep(n : ISleeps){    
    n.FromDate = `${this.fromDate}T${this.fromTime}:00`;
    n.ToDate = `${this.toDate}T${this.toTime}:00`;
  }

}
