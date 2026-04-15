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

  
    public async CreateFeature(feature : IFeature){
      return await this.httpClient.post<number>(this.apiUrls.GetApiURL()+`api/features/`, feature).toPromise();
    }
  
    public async UpdateFeature(feature : IFeature){
      return await this.httpClient.put<number>(this.apiUrls.GetApiURL()+`api/features/${feature.Id}`, feature).toPromise();
    }

    public CreateDefault(projectID : number, roadmapID : number){
      return  <IFeature>{
       Name : "Untitled",
       Details : "",
       Id : 0,
       PersonID : 0,
       CreatedDate : new Date(Date.now()),
       ProjectID : projectID,
       LearningAimID : null,
       RoadMapID : roadmapID
      }
    }
}

export interface IFeature{  
    Id: number;
    PersonID: number;
    Name: string;
    Details : string;
    CreatedDate : string | null | Date;
    ProjectID : number | null;
    LearningAimID: number | null;  
    RoadMapID: number;  
}