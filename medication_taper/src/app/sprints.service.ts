import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

  constructor(private httpClient : HttpClient, 
    private apiUrls : UrlsService) { 
  }  

  public async getAllSprintsForPerson() {
    let g = await this.httpClient.get<{ value : ISprint[]}>( this.apiUrls.GetApiURL()+"Odata/Sprints").toPromise();
    if(g == undefined)
      return [];
    
      return g.value;
  }

  sprints !: ISprint[]; 
}

export interface ISprint{  
    Id: 1;
    PersonID: 1;
    Name: string;
    Description: string;
    StartDate: string;
    EndDate: string;
}