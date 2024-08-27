import { Component } from '@angular/core';
import { IJobDetails, JobsAtHomeService, LogActivity } from './jobs-at-home.service';
import { TimezonesService } from '../timezones.service';

@Component({
  selector: 'app-jobs-at-home',
  templateUrl: './jobs-at-home.component.html',
  styleUrls: ['./../app.component.css']
})
export class JobsAtHomeComponent {
  constructor(private jobsService : JobsAtHomeService,
    private timeService : TimezonesService,
  ){
  }
  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  public adjustForTimezone(date : string | Date | null){
    if(date)
      if(typeof(date) === typeof(" "))
        return this.timeService.adjustForTimezoneStr(date as string);
      else
        return this.timeService.adjustForTimezone(date as Date);

    return "";
  }

  public formatDate(date : string) : string{
    

    // beginning of day
    const bod = new Date(Date.now());
    bod.setHours(0,0,0,0);    
    const thisMorning = this.timeService.dateDifferenceInDays(bod, new Date(Date.now()));
    const dateDiff = this.timeService.dateDifferenceInDays(bod, new Date(date));
    const d = new Date(date);
    const yesterdayBod = this.timeService.subtractDaysFromDateTime(1, bod);
    
    if(d.valueOf() > bod.valueOf())
      return "Today";

    if(yesterdayBod.valueOf() < d.valueOf() && bod.valueOf() > d.valueOf())
      return `Yesterday`;
    
    if(date[0] == "0")
      return "";
    let rounded = Math.round(dateDiff);
    if(dateDiff < -1)
      return `${-rounded} Day(s) a go`;
    
    

    return "";
  }
  public async refresh(){
      let x = await this.jobsService.getJobsAtHomeSummaryForPerson();
      this.jobs = x ?? [];
      console.log("Refreshed Jobs At Home "+ x?.length);
      return x?.length ?? 0;
  }

  public async logActivity(id : number){
    await this.jobsService.logActivity(<LogActivity>{ JobID : id, date : null });
    await this.refresh();
  }
  jobs : IJobDetails[] | null = null;
}
