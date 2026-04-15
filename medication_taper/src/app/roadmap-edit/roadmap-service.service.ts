import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';
import { IRoadMap } from '../backlog/roadmap.service';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {

  constructor(private httpClient : HttpClient, private urlsService : UrlsService ) { }

  public async CreateRoadmap(roadmap : IRoadMap){
    return await this.httpClient.post<number>(this.urlsService.GetApiURL()+`api/roadmaps/`, roadmap).toPromise();
  }

  public async UpdateRoadmap(roadmap : IRoadMap){
    return await this.httpClient.put<number>(this.urlsService.GetApiURL()+`api/roadmaps/${roadmap.Id}`, roadmap).toPromise();
  }
}
