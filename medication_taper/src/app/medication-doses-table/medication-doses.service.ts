import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MedicationDosesService {

  constructor(private httpClient : HttpClient) { 

  }

  private getPassword() : string | null{
    return prompt("Please enter password!");
  }
  public async getDoses() {
    return this.httpClient.get<IReport[]>("http://api.codefusionstudios.co.uk/MedicationDoses/History").toPromise();    
  }

  public async deleteDose(id : number){
    let p = this.getPassword();
    /* Api was changed to use POST because my web service hosting would not allow DELETE Verb and and empty body has needed to be set. */
    let x = await this.httpClient.post("http://api.codefusionstudios.co.uk/MedicationDoses/Delete/"+id+"/"+p, "").toPromise().then( x => { console.log("deleted")});
  }

  public async repeatToday( report : IReport){
    let p = this.getPassword();
      let x = await this.httpClient.post("http://api.codefusionstudios.co.uk/MedicationDoses/"+report.Name, { doseMg : report.DoseTakenMG, consumedDateTime: new Date(), password: p}, { headers : {'Content-Type' : "application/json"}}).toPromise().then( x => { console.log("repeated")});
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
  DateTimeConsumed: string;
  Name: string;
  DoseTakenMG: number;
  DoseMG: number;
}
