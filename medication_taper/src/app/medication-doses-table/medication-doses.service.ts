import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NotesService } from '../notes/notes.service';
import { UrlsService } from 'src/urls.service';
import { UserCredentialsService } from '../user-credentials.service';
@Injectable({
  providedIn: 'root'
})
export class MedicationDosesService {

  constructor(private httpClient : HttpClient, 
    private notesService : NotesService,
    private apiUrls : UrlsService,
    private user : UserCredentialsService) { 

  }

  private getPassword(){
    return this.user.getPassword();
  }
  public async getDoses() {
    let doses = await this.httpClient.get<IReport[]>(this.apiUrls.GetApiURL()+"MedicationDoses/History").toPromise();    
    if(doses){
      for(let d of doses){
        d.ShowNotes = false;
      }
      this.CalculateAccumulatedAmounts(doses, 20);
      this.AddReportForTodayIfNoneAdded(doses);
    }
    
    return doses;
  }

  public async deleteDose(id : number){
    /* Api was changed to use POST because my web service hosting would not allow DELETE Verb and and empty body has needed to be set. */
    let x = await this.httpClient.post(this.apiUrls.GetApiURL()+"MedicationDoses/Delete/"+id, "").toPromise().then( x => { console.log("deleted")});
  }

  public async repeatToday( report : IReport){
    let p = this.getPassword();
      let x = await this.httpClient.post(this.apiUrls.GetApiURL()+"MedicationDoses/"+report.Name, { doseMg : report.DoseTakenMG, consumedDateTime: new Date(), Password: p}, { headers : {'Content-Type' : "application/json"}}).toPromise().then( x => { console.log("repeated")});
  }

  public async GetNotesForDay(report : IReport){
    let notes = await this.notesService.getAllNotesForPerson();
    return notes;    
  }

  public AddReportForTodayIfNoneAdded(reports : IReport[]){
    const f = reports.sort((a : IReport, b : IReport) => {
      let d1 = this.UTC(a.DateTimeConsumed);
        let d2 = this.UTC(b.DateTimeConsumed);
        return d2 - d1;
    });

    let first = f[0] ?? null;
    if(first && first.DateTimeConsumed.getDate != new Date().getDate){
      reports.push(<IReport>{ 
        DateTimeConsumed : new Date(),
        DoseTakenMG : 0,
        DoseMG : first.DoseMG,
        Name : "Olanzapine",
        ShowNotes : false,
        MedicationID : -1
      });

      this.AddReportForTodayIfNoneAdded(reports);
    }
  }
  
  public CalculateAccumulatedAmounts(reports : IReport[], historyLength : number){
    for(let x of reports){
      this.CalculateAccumulatedAmount(reports, historyLength, x);
    }
  }

  public CalculateAccumulatedAmount(reports : IReport[], historyLength : number, report : IReport){
    let orderedByDate = reports.filter( (r) => {
      return r.Name == report.Name;
    }).sort( 
      (a, b) => { 
        let d1 = this.UTC(a.DateTimeConsumed);
        let d2 = this.UTC(b.DateTimeConsumed);
        return d2 - d1;
      }
    );

    let amount = 0;
    let index = orderedByDate.findIndex( (r) => { return r.MedicationID == report.MedicationID;});
    if(index == -1)
      return;
    for(let i = 0; i < historyLength; ++i){
      
      // avoid going out of bounds
      if(orderedByDate.length <= i + index)
        break;

      // hours
      let r2 = orderedByDate[i+index];
      let d1 = r2.DateTimeConsumed;
      let d2 = report.DateTimeConsumed;
      var hours = Math.abs(this.UTC(d1) - this.UTC(d2)) / 36e5;
      
      // using half life calculate the amount remaining
      let mgRemaining = Math.pow(0.5, hours/r2.HalfLifeHrs)*r2.DoseTakenMG;
      amount += mgRemaining;

      // estimated remaining as of today
      var hours2 = Math.abs(this.UTC(d1)-Date.now()) / 36e5;
      r2.RemainingMg = Math.pow(0.5, hours2/r2.HalfLifeHrs)*r2.DoseTakenMG;
    }

    report.AccumulatedMg = amount;
  }
  public UTC(d : Date) : number{
    let d1 = new Date(d);
    return Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes(), d1.getSeconds())
  }
}

export interface IMedication {
  MedicationID: number;
  CreatedDate: string | null;
  CreatedUser: string;
  UpdatedDate: string;
  UpdatedUser: string;
  PrescriptionId: number;
  DoseTakenMG: number;
  PersonID: number;
  DateTimeConsumed: string;
}

export interface IReport {
  MedicationID: number;
  DateTimeConsumed: Date;
  Name: string;
  DoseTakenMG: number;
  DoseMG: number;
  ShowNotes: boolean;
  AccumulatedMg : number;
  HalfLifeHrs : number;
  RemainingMg : number;
}
