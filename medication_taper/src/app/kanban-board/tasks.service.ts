import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient : HttpClient, private urlsService : UrlsService) { }

  public async getAllForPerson(){
    let x = await this.httpClient.get<ITasks[]>( this.urlsService.GetApiURL()+"Api/Tasks").toPromise();
    return x;
  }

  public async getAllForPersonTableRecord(tableID : string, recordID : number){
    let x = await this.httpClient.get<ITasks[]>( this.urlsService.GetApiURL()+"Api/Tasks",  { 
      params: 
      {
        
          "tableName" : tableID,
          "entityID" : recordID            
      }
    }).toPromise();
    return x;
  }
}


export interface ITasks {
    TaskID: number;

    TaskName?: string;

    CreatedDate: Date;

    CreatedBy: string;

    PersonID: number;

    DueDate: Date;

    Description?: string;

    DateCompleted: string;

    Priority: number;

    Status: string;
}
