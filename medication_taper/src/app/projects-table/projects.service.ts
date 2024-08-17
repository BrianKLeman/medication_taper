import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentialsService } from '../user-credentials.service';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private httpClient : HttpClient, 
    private user : UserCredentialsService,
    private apiUrls : UrlsService) { 
  }

  public async getAllProjectsForPerson(){
    let x = await this.httpClient.get<IProject[]>( this.apiUrls.GetApiURL()+"Api/Projects").toPromise();
    if(x)
    for(let p of x){
      p.ShowNotes = false;
    }
    return x;
  }
}

export interface IProject{
  ProjectID : number,
  PersonID : number,
   Name : string,
  CreatedDate : Date,
  CreatedBy : string,   
  Priority : number,
  Status : number,
  StartDate : Date | null,
  EndDate : Date | null,
  ShowNotes : boolean
}