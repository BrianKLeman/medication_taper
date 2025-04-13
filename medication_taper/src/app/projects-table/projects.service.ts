import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentialsService } from '../user-credentials.service';
import { UrlsService } from 'src/urls.service';
import { AdhocTablesService, IAdhocTable } from '../adhoc-tables/adhoctables.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private httpClient : HttpClient, 
    private apiUrls : UrlsService) { 
  }

  public async getAllProjectsForPerson(){
    let x = await this.httpClient.get<IProject[]>( this.apiUrls.GetApiURL()+"Api/Projects").toPromise();
    
    if(x)
    for(let p of x){
      p.ShowNotes = false;
      p.ShowTasks = false;
      p.ShowAdhocTables = false;

    }
    return x;
  }

  
}

export interface IProject{
  Id : number,
  PersonID : number,
   Name : string,
  CreatedDate : Date,
  CreatedBy : string,   
  Priority : number,
  Status : number,
  StartDate : Date | null,
  EndDate : Date | null,
  ShowNotes : boolean,
  ShowTasks : boolean,
  ShowAdhocTables : boolean,
  AdhocTables : IAdhocTable[]
}