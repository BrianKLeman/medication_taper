import { Injectable } from '@angular/core';
import { ProjectsService } from '../projects-table/projects.service';
import { LearningAimsService } from '../learning-aims-table/learning-aims.service';
import { SleepsService } from '../sleeps-table/sleeps.service';
import { PhenomenaService } from '../phenomena-table/phenomena.service';
import { AppointmentsService } from '../appointments-table/appointments.service';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor( private projectsService : ProjectsService,
    private learningAimsService : LearningAimsService,
    private sleepsService : SleepsService,
    private phenomenaService : PhenomenaService,
    private appointmentsService : AppointmentsService,
    private httpClient : HttpClient,
   private urlsService : UrlsService  ) { }

  public async getRecords(recordType : string){

    if(recordType == "PROJECTS"){
      return await this.projectsService.getAllProjectsForPerson();
    }

    if(recordType == "SLEEPS"){
      return await this.sleepsService.getAllForPerson();
    }

    if(recordType == "LEARNING_AIMS"){
      return await this.learningAimsService.getAllAimsForPerson();
    }

    if(recordType == "PHENOMENA"){
      return await this.phenomenaService.getAllPhenomenaForPerson();
    }

    if(recordType == "APPOINTMENTS"){
      return await this.appointmentsService.getAllAppointmentsForPerson();
    }

    return [];
  }
}
