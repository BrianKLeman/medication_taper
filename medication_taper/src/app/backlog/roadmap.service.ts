import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {

  constructor(private urlsService : UrlsService,
    private httpClient : HttpClient
  ) {

   }

   public async getRoadmapsForProject(projectID : number){
    return await this.httpClient.get<IRoadMap[]>(`${this.urlsService.GetApiURL()}api/RoadMaps`, { "params" : {
      "projectID" : projectID
    }}).toPromise();

   }
}

export interface IRoadMap{
  Id : number;
  Name : string;
  PersonId : number;
  ProjectID : number | null;
  LearningAimID : number | null;
  CreatedDate : string | null | Date;
  Details : string;
}