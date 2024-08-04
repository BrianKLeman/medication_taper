import { Component, Input, OnInit } from '@angular/core';
import { IReport, MedicationDosesService } from './medication-doses.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotesComponent } from '../notes/notes.component';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { TokenService } from '../token.service';
import { TimezonesService } from '../timezones.service';

@Component({
  selector: 'medication-doses-table',
  templateUrl: './medication-doses-table.component.html',
  styleUrls: ['./../app.component.css']
})
export class MedicationDosesTableComponent implements OnInit {
  constructor(private service : MedicationDosesService,
    private tokenService : TokenService,
    private adjustTime : TimezonesService){

  }
  public isLoggedIn(){
    let token = this.tokenService.Token?.Token?.trim();

    return token != null && token != ""; 
  }
  public filteredModel : IReport[] = [];
  async ngOnInit() {
   await this.reload();
  }

  public doFilter(arg : any ){
    
    let m = this.filterPrescriptionName(this.model);
    m = this.filterPrescriptionDose(m);
    this.filteredModel = m;
  }

  public filterPrescriptionName(m : IReport[]){
    const pName = document.getElementById('prescriptionName') as any;
    const v = pName.value;
    if(v.trim() != "None")
      return m.filter( (r : IReport) => { return r.Name == v; })
    else
      return m;
  }

  public filterPrescriptionDose(m : IReport[]){
    const dName = document.getElementById('prescribedDose') as any;
    const v = dName.value;
    if(v.trim() != "None")
      return m.filter( (r : IReport) => { return r.DoseMG == v; })
    else
      return m;
  }
  @Input()
  model : IReport[] = [];

  public async delete(medication : number){
    await this.service.deleteDose(medication);
    await this.reload();
  }

  private async reload(){
     let m = await this.service.getDoses();
    if(m){
      this.model = m;
      this.filteredModel = m;
    }
  }

  public portionTaken( percent : IReport){
    return (percent.DoseTakenMG/percent.DoseMG);
  }

  public trafficLights(percent : IReport){
    let s = this.lerpColours(percent, this.redLight, this.amberLight, this.greenLight);
    return `rgb(${s.red},${s.green},${s.blue})`;
  }
  public lerpColours( percent : IReport, zeroPercent : ColourStop, fiftyPercent : ColourStop, hundredPercentAndAbove : ColourStop)
  {
    let perc = (percent.DoseTakenMG/percent.DoseMG)*100;
    let s = new ColourStop;
    if(perc < 50){
      let amount = perc*2;
      s = this.lerp(amount/100, zeroPercent, fiftyPercent);
    } else if (perc < 100){
      let amount = (perc - 50)*2;
      s = this.lerp(amount/100, fiftyPercent, hundredPercentAndAbove);      
    }
    else {
      s = hundredPercentAndAbove;
    }

    return s;
  }

  public lerp(amount : number, left : ColourStop, right : ColourStop) : ColourStop{
    let r = (1.0-amount)*left.red + amount*right.red;
    let g = (1.0-amount)*left.green + amount*right.green;
    let b = (1.0-amount)*left.blue + amount*right.blue;
    return <ColourStop>{ red : r, green : g, blue: b};
  }

  private redLight = <ColourStop>{ red : 255, green :  3, blue : 3};
  private amberLight = <ColourStop>{ red: 211, green : 245, blue : 4};
  private greenLight = <ColourStop>{ red: 74, green: 255, blue: 0};

  public async repeat(report : IReport){
    await this.service.repeatToday(report);
    await this.reload();
  }

  public async showNotes(report : IReport){
    report.ShowNotes = !report.ShowNotes;
  }

  public sumRemaining(name : string){
    let sum = 0.0;
    for(let r of this.model){
      if(r.Name == name)
        sum += r.RemainingMg;
    } 
    return sum;
  }

  

  public adjustForTimeZone(date : Date) : Date{
    return this.adjustTime.adjustForTimezone(new Date(date));
  }
}

export class ColourStop
{
  public red : number = 0;
  public green : number = 0;
  public blue : number = 0;
}