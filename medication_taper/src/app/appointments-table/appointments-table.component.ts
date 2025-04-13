import { Component } from '@angular/core';
import { AppointmentsService, IAppointment } from './appointments.service';
import { TimezonesService } from '../timezones.service';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from 'src/urls.service';
import { TokenService } from '../token.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appointments-table',
  templateUrl: './appointments-table.component.html',
  styleUrls: ['./../app.component.css']
})
export class AppointmentsComponent {
    constructor(private appointmentsService : AppointmentsService,
      private httpClient : HttpClient,
      private apiUrls : UrlsService,
      private tokenService : TokenService,     
      private dialog : MatDialog         
    ){
    }
    async ngOnInit(): Promise<void> {
      await this.refresh();
    }

    async showNotes(appointment : IAppointment){
      appointment.ShowNotes = !appointment.ShowNotes;    
    }
    

    public async refresh(){
        let x = await this.appointmentsService.getAllAppointmentsForPerson();
        this.appointments = x ?? [];
        console.log("Refreshed Appointments "+ x?.length);
        return x?.length ?? 0;
    }

    appointments : IAppointment[] | null = null;

    //#region "EditAppointments"  
      
    public async addAppointment(){
        let d =  new Date(Date.now());
        let x = await this.dialog.open(AppointmentsComponent, { data : 
          {datetime : d
          }}).afterClosed().toPromise();
        
        setTimeout(async () => 
          { 
            await this.refresh(); 
            console.log('returned' + count); 
          }, 
          500);
        let count = await this.refresh();
      } 

      public async deleteAppointment(id : number){
        let x = await this.httpClient.delete<number>( 
          this.apiUrls.GetApiURL()+"Api/Appointments/"+id, {})
          .toPromise().then( (n) => { console.log(`deleted appointment with id ${n}`);});
        }
    //#endregion

    public get HasUserID()  {
      let token = this.tokenService.Token;
      return token?.Token != "" &&  token?.Token != null;
    }
}
