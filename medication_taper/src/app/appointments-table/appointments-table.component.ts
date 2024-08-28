import { Component } from '@angular/core';
import { AppointmentsService, IAppointment } from './appointments.service';
import { TimezonesService } from '../timezones.service';

@Component({
  selector: 'app-appointments-table',
  templateUrl: './appointments-table.component.html',
  styleUrls: ['./../app.component.css']
})
export class AppointmentsComponent {
    constructor(private appointmentsService : AppointmentsService,
      private timeService : TimezonesService,
    ){
    }
    async ngOnInit(): Promise<void> {
      await this.refresh();
    }

    async showNotes(appointment : IAppointment){
      appointment.ShowNotes = !appointment.ShowNotes;    
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
        let x = await this.appointmentsService.getAllAppointmentsForPerson();
        this.appointments = x ?? [];
        console.log("Refreshed Appointments "+ x?.length);
        return x?.length ?? 0;
    }

    appointments : IAppointment[] | null = null;

    
}
