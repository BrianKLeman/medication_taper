import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentialsService } from '../user-credentials.service';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  constructor(private httpClient : HttpClient, 
    private user : UserCredentialsService,
    private apiUrls : UrlsService) { 
  }

  public async getAllAppointmentsForPerson(){
    let x = await this.httpClient.get<IAppointment[]>( this.apiUrls.GetApiURL()+"Api/Appointments/Appointments").toPromise();
    if(x)
    for(let p of x){
      p.ShowNotes = false;
    }
    return x;
  }

  public addAppointment(appointment : IAppointment){
    this.httpClient.post<IAppointment>( 
      this.apiUrls.GetApiURL()+"Api/Appointments",
      <IAppointment>{ Id : 0,
        AppointmentDate : appointment.AppointmentDate,
        AppointmentName : appointment.AppointmentName,
        CreatedDate : new Date().toISOString(),
        PersonID : 0,
        CreatedBy : "BKL",
        ShowNotes : false
        }
    ).toPromise().then( (n) => { console.log(`written note with id ${n}`); });
  }

  public updateAppointment(appointment : IAppointment){
    this.httpClient.put<IAppointment>( 
      this.apiUrls.GetApiURL()+"Api/Appointments",
      appointment
    ).toPromise().then( (n) => { console.log(`written note with id ${n}`); });
  }
}

export interface IAppointment{
  Id : number,
  PersonID : number,
  AppointmentName : string,
  CreatedDate : string,
  CreatedBy : string, 
  AppointmentDate : string | null,  
  ShowNotes : boolean
}