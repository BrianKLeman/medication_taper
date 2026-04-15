import { Injectable, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UrlsService } from 'src/urls.service';
import { UserCredentialsService } from '../user-credentials.service';
import { IReport, MedicationDosesService } from './medication-doses.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationDoseCalculatorService implements OnInit { 

  constructor(private httpClient : HttpClient, 
    private apiUrls : UrlsService,
    private user : UserCredentialsService,
    private medicationService : MedicationDosesService) { 
      
  }
  async ngOnInit(): Promise<void> {
    await this.getDoses();
  }
  
  private getPassword(){
    return this.user.getPassword();
  }

  private dosesCache : IReport[] = [];
  public async getDoses() {
    let doses = await this.medicationService.getDoses();
    if(doses)
      this.dosesCache = doses;
    return doses;
  }

  public AmountAtTimeOfOlanzapine(date : Date){

  }
  
  public LastPillAmount(date : Date | string, prescriptionID : number){

    if(this.dosesCache.length < 1){
      
    console.log(`Cache is empty`);
      return 0;
    }
    console.log(`doses count: ${this.dosesCache.length}`);
    let latest = null;
    let lastReport : IReport | null = null;
    const startDate = this.UTC(date);
    for(let report of this.dosesCache.filter( x => x.PrescriptionID == prescriptionID).sort( 
      (a, b) => { 
        let d1 = this.UTC(a.DateTimeConsumed);
        let d2 = this.UTC(b.DateTimeConsumed);
        return d1-d2;
      }
    )){
      let rd = this.UTC(report.DateTimeConsumed);
      if(rd < startDate){
        lastReport = report;

      }
      else
      {
        break;
      }
    }
    return lastReport?.DoseTakenMG;
  }
 

  public calculateExpectedAmount(reports : IReport[], historyLength : number, report : IReport){
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

  
  public UTC(d : Date | string) : number{
    let d1 = new Date(d);
    return Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes(), d1.getSeconds())
  }
}