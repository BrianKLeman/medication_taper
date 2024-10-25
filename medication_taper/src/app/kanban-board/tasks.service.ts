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
    if(x)
      for(let i of x){
        i.Selected = false;
      }
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
    let x = await this.httpClient.put( this.urlsService.GetApiURL()+"Api/Tasks",  task).toPromise();
    return x;
  }

  public async CreateTask(task : ITasks){
    let x = await this.httpClient.post( this.urlsService.GetApiURL()+"Api/Tasks",  task).toPromise();
    return x;
  }

  public async DeleteTask(task : ITasks){
    let x = await this.httpClient.delete( this.urlsService.GetApiURL()+"Api/Tasks",  {body : task}).toPromise();
    return x;
  }
}


export interface ITasks {
    Id: number;
    TaskName?: string;
    CreatedDate: string | null;
    CreatedBy: string;
    PersonID: number;
    DueDate : string | null;
    Description?: string;
    DateCompleted: string | null;
    Priority: number;
    Status: string;
    Selected : boolean;
}

export const COMPLETED = "COMPLETED";
export const IN_REVIEW = "IN_REVIEW";
export const NOT_STARTED = "NOT_STARTED";
export const IN_PROGRESS = "IN_PROGRESS"; 
export const STARTED = "STARTED"; 