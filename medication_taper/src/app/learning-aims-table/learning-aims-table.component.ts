import { Component, OnInit } from '@angular/core';
import { ILearningAim, LearningAimsService } from './learning-aims.service';
import { TimezonesService } from '../timezones.service';

@Component({
  selector: 'learning-aims-table',
  templateUrl: './learning-aims-table.component.html',
  styleUrls: ['./../app.component.css']
})
export class LearningAimsTableComponent implements OnInit {

  constructor(private aimsService : LearningAimsService,
    private timeService : TimezonesService,
  ){
  }
  async ngOnInit(): Promise<void> {
    await this.refreshAims();
  }

  public adjustForTimezone(date : string | Date | null){
    if(date)
      if(typeof(date) === typeof(" "))
        return this.timeService.adjustForTimezoneStr(date as string);
      else
        return this.timeService.adjustForTimezone(date as Date);

    return "";
  }

  public async refreshAims(){
      let x = await this.aimsService.getAllAimsForPerson();
      this.aims = x ?? [];
      console.log("Refreshed Aims "+ x?.length);
      return x?.length ?? 0;
  }

  aims : ILearningAim[] | null = null;
}
