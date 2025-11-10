import { Component, Inject, Input } from '@angular/core';
import { ILearningAim } from '../learning-aims-table/learning-aims.service';
import { ISleeps } from '../sleeps-table/sleeps.service';
import { IProject } from '../projects-table/projects.service';
import { IPhenomena } from '../phenomena-table/phenomena.service';
import { NoteLinksService } from './note-links.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAppointment } from '../appointments-table/appointments.service';
import { IFeature } from '../features.service';
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

    if(la.Id != undefined && la.Name != undefined){
      return { id : la.Id, desc : `${la.Name}`};
    }

    let sleep = record as ISleeps;
    if(sleep.Id != undefined && sleep.FromDate != undefined){
      return { id : sleep.Id, desc : `${ sleep.FromDate }`};
    }

    let p = record as IProject;
    if(p.Id != undefined && p.Name != undefined){
      return { id : p.Id, desc : `${ p.Name}`};
    }

    let s = record as IPhenomena;
    if(s.Id != undefined && s.PhenomenaDetails != undefined){
      return { id : s.Id, desc : `${ s.PhenomenaDetails}`};
    }

    let app = record as IAppointment;
    if(app.Id != undefined && app.AppointmentName != undefined){
      return { id : app.Id, desc : `${ app.AppointmentName}`};
    }

    let feature = record as IFeature;
      if(feature.Id != undefined && feature.Name != undefined){
        return { id : feature.Id, desc : `${ feature.Name}`};
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

