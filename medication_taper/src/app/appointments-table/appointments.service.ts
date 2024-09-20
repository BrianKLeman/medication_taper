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
}

export interface IAppointment{
  Id : number,
  PersonID : number,
  AppointmentName : string,
  CreatedDate : Date,
  CreatedBy : string, 
  AppointmentDate : Date | null,  
  ShowNotes : boolean
}