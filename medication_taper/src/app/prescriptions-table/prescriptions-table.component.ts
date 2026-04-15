import { Component } from '@angular/core';
import { IPrescription, PrescriptionsService } from './prescriptions.service';
import { TimezonesService } from '../timezones.service';

@Component({
    selector: 'prescriptions-table',
    templateUrl: './prescriptions-table.component.html',
    styleUrls: ['./../app.component.css'],
    standalone: false
})
export class PrescriptionsTableComponent {
  constructor(private prescriptionsService : PrescriptionsService,
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
      let x = await this.prescriptionsService.getAllPrescriptionsForPerson();
      this.prescriptions = x ?? [];
      console.log("Refreshed Prescriptions "+ x?.length);
      return x?.length ?? 0;
  }

  prescriptions : IPrescription[] | null = null;
}
