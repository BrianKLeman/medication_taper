import { Component, Inject, Input } from '@angular/core';
import { ILearningAim } from '../learning-aims-table/learning-aims.service';
import { ISleeps } from '../sleeps-table/sleeps.service';
import { IProject } from '../projects-table/projects.service';
import { IPhenomena } from '../phenomena-table/phenomena.service';
import { NoteLinksService } from './note-links.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAppointment } from '../appointments-table/appointments.service';
@Component({
  selector: 'app-link-note-to',
  templateUrl: './link-note-to.component.html',
  styleUrls: ['./link-note-to.component.css']
})
export class LinkNoteToComponent {

    public constructor(@Inject(MAT_DIALOG_DATA) 
        public data: {
          noteIDs : number[]
        },
        private recordsService : NoteLinksService
    ) {

      this.noteIDs = data.noteIDs;
      
    }
  
    private noteIDs : number[] = [];

  public recordType : string = "";

  public get RecordType(){
    return this.recordType;
  }
  public set RecordType(arg : string){
    if(this.recordType != arg){
      this.recordType = arg;
      this.recordsService.getRecords(this.recordType).then( 
        (results) => 
          {
            let record = [];
            if(results){
              for(let x of results){
                record.push(this.ToRecord(x));
              }
            }
            this.records = record;
      });
    }
  }
  public ToRecord(record : any) : {id : number, desc : string}{

    let la = record as ILearningAim;

    if(la.LearningAimID != undefined){
      return { id : la.LearningAimID, desc : `${la.Name}`};
    }

    let sleep = record as ISleeps;
    if(sleep.SleepID != undefined){
      return { id : sleep.SleepID, desc : `${ sleep.FromDate }`};
    }

    let p = record as IProject;
    if(p.ProjectID != undefined){
      return { id : p.ProjectID, desc : `${ p.Name}`};
    }

    let s = record as IPhenomena;
    if(s.PhenomenaID != undefined){
      return { id : s.PhenomenaID, desc : `${ s.PhenomenaDetails}`};
    }

    let app = record as IAppointment;
    if(app.AppointmentID != undefined){
      return { id : app.AppointmentID, desc : `${ app.AppointmentName}`};
    }

    return { id : -1, desc : `Unspecified`};
  }

  records : {id : number, desc : string}[] = [];

  rec : {id : number, desc : string} | null = null;

  id : number = 0;
  public async SaveLink(){
    if(this.id)
      await this.recordsService.AddLink(this.noteIDs, this.recordType, this.id);
  }
}

