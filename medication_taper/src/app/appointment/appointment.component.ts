import { Component, Inject } from '@angular/core';
import { AppointmentsService, IAppointment } from '../appointments-table/appointments.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
public constructor(@Inject(MAT_DIALOG_DATA) 
        public data: 
        {
          datetime: Date,
          note : IAppointment | null
        },
    private service : AppointmentsService){

      if(!data.note){
        let now = new Date(Date.now());
        this.currentAppointment = this.CreateNewAppointment(now);
      } else {
        this.currentAppointment = data.note;
        
        // I need to correct the date time because the server is adjusting it.
        
        this.setDateAndTime(new Date(this.currentAppointment.AppointmentDate ?? Date.now()));
      }
      
  }

  private CreateNewAppointment(now : Date) : IAppointment{
    let ct = now;
    ct.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
    this.setDateAndTime(ct);
    console.log(ct.toISOString());
    let currentNote = <IAppointment> 
    { 
      Id : 0, 
      PersonID : 0, 
      AppointmentName : "",
    };
    return currentNote;
  }
  public SaveAppointment(){
    this.updateAppointment(this.currentAppointment);
    if(this.currentAppointment?.Id == 0)
      this.service.addAppointment(this.currentAppointment);
      
    else
      this.service.updateAppointment(this.currentAppointment);
  }  
  
  date : string = "";
  time : string = "";
  currentAppointment : IAppointment;

  public changeDate(d : Date){
    this.date = d.toISOString().split('T')[0];
  }
  option = ""; // used for note type links.

  private setDateAndTime(d : Date){
        this.date = d.toISOString().split("T")[0];
        this.time = d.toISOString().split("T")[1].substring(0,5);
  }

  private updateAppointment(n : IAppointment){    
    n.AppointmentDate = `${this.date}T${this.time}:00`;
  }

  private entityID = -1;
  private tableName = "";
}
