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
    const today = new Date(Date.now());
    let dateDiff = this.timeService.dateDifferenceInDays( new Date(date), today);
    today.setHours(0,0,0,0);
    const thisMorning = this.timeService.dateDifferenceInDays(today, new Date(date));

    if(thisMorning > dateDiff)
      return "Today";
    let rounded = Math.round(dateDiff);
    if(rounded < 100)
      return `${rounded} Day(s) a go`;

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
