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

  public async UpdateTask(task : ITasks){
    let x = await this.httpClient.post<ITasks[]>( this.urlsService.GetApiURL()+"Api/Tasks/update",  task).toPromise();
    return x;
  }
}


export interface ITasks {
    Id: number;

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

export const COMPLETED = "COMPLETED";
export const IN_REVIEW = "IN_REVIEW";
export const NOT_STARTED = "NOT_STARTED";
export const IN_PROGRESS = "IN_PROGRESS"; 