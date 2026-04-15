import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class SubTasksService {

  constructor(private httpClient : HttpClient, private urlsService : UrlsService) {

   }

   public async UpdateSubTask(subTask : ISubTask){
    return await this.httpClient.put<number>(`${this.urlsService.GetApiURL()}API/Tasks/${subTask.TaskID}/SubTasks/`, subTask).toPromise();
   }

   public async CreateSubTask(subTask : ISubTask){
    return await this.httpClient.post<number>(`${this.urlsService.GetApiURL()}API/Tasks/${subTask.TaskID}/SubTasks/`, subTask).toPromise();
   }

   public async DeleteSubTask(subTask : ISubTask){
    return await this.httpClient.delete<number>(`${this.urlsService.GetApiURL()}API/Tasks/${subTask.TaskID}/SubTasks/${subTask.Id}`).toPromise();
   }
}

export interface ISubTask{  
  Id : number;
  Name : string;
  PersonId : number;
  TaskID : number;
  Details : string;
  Status : string;
  CreatedDate : Date;
  MinHours : number;
  MaxHours : number;
  ExpectedHours : number;
  ActualHours : number;
  DateCompleted : string | null;
}