import { Component, Input, OnInit } from '@angular/core';
import { IReport, MedicationDosesService } from './medication-doses.service';

@Component({
  selector: 'medication-doses-table',
  templateUrl: './medication-doses-table.component.html',
  styleUrls: ['./../app.component.css']
})
export class MedicationDosesTableComponent implements OnInit {
  constructor(private service : MedicationDosesService){

  }

  async ngOnInit() {
   await this.reload();
  }

  @Input()
  model : IReport[] = [];

  public async delete(medication : number){
    await this.service.deleteDose(medication);
    await this.reload();
  }

  private async reload(){
     let m = await this.service.getDoses();
    if(m)
      this.model = m;
  }

  public calcPercent( percent : IReport){
    return (percent.DoseTakenMG/percent.DoseMG)*100;
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
}

export class ColourStop
{
  public red : number = 0;
  public green : number = 0;
  public blue : number = 0;
}