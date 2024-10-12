import { Injectable } from '@angular/core';
import { ProjectsService } from '../projects-table/projects.service';
import { LearningAimsService } from '../learning-aims-table/learning-aims.service';
import { SleepsService } from '../sleeps-table/sleeps.service';
import { PhenomenaService } from '../phenomena-table/phenomena.service';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from 'src/urls.service';
import { AppointmentsService } from '../appointments-table/appointments.service';
import { LinksService } from '../link-task-to/links.service';

@Injectable({
  providedIn: 'root'
})
export class NoteLinksService {

  constructor(
               private httpClient : HttpClient,
              private urlsService : UrlsService,
              private linksService : LinksService  ) { }

  public async getRecords(recordType : string){
    return await this.linksService.getRecords(recordType);   
  }

  public AddLink(noteIDs : number[], tableName : string, entityID : number){
    this.httpClient.post<number>( 
      this.urlsService.GetApiURL()+"Api/NoteLinks",
      { 
        NoteIDs : noteIDs,
        Table : tableName,
        EntityID : entityID
      }
    ).toPromise().then( (n) => { console.log(`written note links with id ${n}`); });
  }
}
