import { Component } from '@angular/core';
import { TimezonesService } from '../timezones.service';
import { ISleeps, SleepsService } from './sleeps.service';

@Component({
  selector: 'sleeps-table',
  templateUrl: './sleeps-table.component.html',
  styleUrls: ['./../app.component.css']
})
export class SleepsTableComponent {

  constructor(private sleepsService : SleepsService,
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

  public async refresh(){
      let x = await this.sleepsService.getAllForPerson();
      this.sleeps = x ?? [];
      console.log("Refreshed Sleeps "+ x?.length);
      return x?.length ?? 0;
  }

  sleeps : ISleeps[] | null = null;
}
