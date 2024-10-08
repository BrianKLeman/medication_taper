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
    let doses = await this.httpClient.get<IReport[]>(this.apiUrls.GetApiURL()+"Api/MedicationDoses").toPromise();    
    if(doses){
      for(let d of doses){
        d.ShowNotes = false;
      }
      this.CalculateAccumulatedAmounts(doses, 20);
    }
    
    return doses;
  }

  public async deleteDose(id : number){
    let x = await this.httpClient.delete(this.apiUrls.GetApiURL()+"Api/MedicationDoses/"+id).toPromise().then( x => { console.log("deleted")});
  }

  public async repeatToday( report : IReport){
    let p = this.getPassword();
      let x = await this.httpClient.post(this.apiUrls.GetApiURL()+"Api/MedicationDoses", { doseMg : report.DoseTakenMG, consumedDateTime: new Date(), Password: p, PrescriptionID : report.PrescriptionID}, { headers : {'Content-Type' : "application/json"}}).toPromise().then( x => { console.log("repeated")});
  }

  public async GetNotesForDay(report : IReport){
    let notes = await this.notesService.getAllNotesForPerson();
    return notes;    
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
    let index = orderedByDate.findIndex( (r) => { return r.Id == report.Id;});
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
  Id: number;
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
  Id: number;
  DateTimeConsumed: Date;
  Name: string;
  DoseTakenMG: number;
  DoseMG: number;
  ShowNotes: boolean;
  AccumulatedMg : number;
  HalfLifeHrs : number;
  RemainingMg : number;
  PrescriptionID : number;
}
