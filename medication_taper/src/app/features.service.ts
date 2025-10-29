import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  constructor(private httpClient : HttpClient, 
    private apiUrls : UrlsService) { 
  }  

  public async getAllFeaturesForPerson() {
    let g = await this.httpClient.get<IFeature[]>( this.apiUrls.GetApiURL()+"api/features").toPromise();
    if(g == undefined)
      return [];
    
      return g;
  }

  public async getAllFeaturesForProjectAndPerson(projectID : number) {
    let g = await this.httpClient.get<IFeature[]>( this.apiUrls.GetApiURL()+"api/features", {
      params : {
      "projectID" : projectID
    }
  }).toPromise();
    if(g == undefined)
      return [];
    
      return g;
  }

   public async getAllFeaturesForLearningAimAndPerson(learningAimID : number) {
    let g = await this.httpClient.get<IFeature[]>( this.apiUrls.GetApiURL()+"api/features", {

    params : {
      "learningAimID" : learningAimID
    }}
  ).toPromise();
    if(g == undefined)
      return [];
    
      return g;
  }

  features !: IFeature[]; 
}

export interface IFeature{  
    Id: number;
    PersonID: number;
    Name: string;
    ProjectID : number;
    LearningAimID: number;    
}