import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILearningAim } from '../learning-aims-table/learning-aims.service';
import { ISleeps } from '../sleeps-table/sleeps.service';
import { IProject } from '../projects-table/projects.service';
import { IPhenomena } from '../phenomena-table/phenomena.service';
import { IAppointment } from '../appointments-table/appointments.service';
import { TaskLinksService } from './task-links.service';
import { IGroups } from '../groups.service';
import { ISprint } from '../sprints.service';

@Component({
  selector: 'app-link-task-to',
  templateUrl: './link-task-to.component.html',
  styleUrls: ['./link-task-to.component.css']
})
export class LinkTaskToComponent {
public constructor(@Inject(MAT_DIALOG_DATA) 
        public data: {
          taskIDs : number[]
        },
        private recordsService : TaskLinksService
    ) {

      this.taskIDs = data.taskIDs;
      
    }
  
    private taskIDs : number[] = [];

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

    if(la.Id != undefined){
      return { id : la.Id, desc : `${la.Name}`};
    }

    let sleep = record as ISleeps;
    if(sleep.Id != undefined){
      return { id : sleep.Id, desc : `${ sleep.FromDate }`};
    }

    let p = record as IProject;
    if(p.Id != undefined){
      return { id : p.Id, desc : `${ p.Name}`};
    }

    let s = record as IPhenomena;
    if(s.Id != undefined){
      return { id : s.Id, desc : `${ s.PhenomenaDetails}`};
    }

    let app = record as IAppointment;
    if(app.Id != undefined){
      return { id : app.Id, desc : `${ app.AppointmentName}`};
    }

    let g = record as IGroups;
    if(g.Id != undefined){
      return { id : g.Id, desc : `${ g.Name}`};
    }

    let sprint = record as ISprint;
    if(sprint.Id != undefined){
      return { id : sprint.Id, desc : `${ sprint.Name}`};
    }

    return { id : -1, desc : `Unspecified`};
  }

  records : {id : number, desc : string}[] = [];

  rec : {id : number, desc : string} | null = null;

  id : number = 0;
  public async SaveLink(){
    if(this.id)
      await this.recordsService.AddLink(this.taskIDs, this.recordType, this.id);
  }
}
