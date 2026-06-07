import { Component, Inject } from '@angular/core';
import { IMedication, MedicationDosesService } from '../medication-doses-table/medication-doses.service';
import { TimezonesService } from '../timezones.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-add-medication',
    templateUrl: './add-medication.component.html',
    styleUrls: ['./add-medication.component.css'],
    standalone: false
})
export class AddMedicationComponent {

public constructor(@Inject(MAT_DIALOG_DATA) 
        public data: 
        {
          prescriptionId: number,
          dose : IMedication | null
        },
    private service : MedicationDosesService,
    private timeService : TimezonesService   
               ){

      if(!data.dose){
        let now = new Date(Date.now());
        this.currentDose = this.CreateNewDose(now, data.prescriptionId);
      } else {
        this.currentDose = data.dose;
        
        // I need to correct the date time because the server is adjusting it.
        this.date = this.currentDose.DateTimeConsumed;
      }
      
  }

  private CreateNewDose(now : Date, prescriptionId : number) : IMedication {    
    this.setDateAndTime(now);
    let dose = <IMedication>{ 
      DateTimeConsumed : now.toISOString(), 
      Id : 0, 
      CreatedUser : "",
      CreatedDate : now.toISOString(),
      UpdatedUser : "",
      UpdatedDate : "",
      PrescriptionId : prescriptionId
    };
    return dose;
  }

  public SaveMedication(){
    this.updateDose(this.currentDose);
    if(this.currentDose?.Id == 0)
      this.service.createNew(this.currentDose); 
  }  
  
  date : string = "";
  currentDose : IMedication;
  option = ""; // used for note type links.

  private setDateAndTime(d : Date){
        this.date = d.toISOString();
  }

  private updateDose(n : IMedication){    
    n.DateTimeConsumed = this.date;
    n.DoseTakenMG = (this.doseWeight_mg / this.tabletWeight_mg)*7.5;
  }

  tabletWeight_mg : number = 0;
  doseWeight_mg : number = 0;
}
