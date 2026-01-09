import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';
import { TaskLinksService } from '../link-task-to/task-links.service';
import { ISprint } from '../sprints.service';
import { FeaturesService, IFeature } from '../features.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient : HttpClient, 
    private urlsService : UrlsService,
    private taskLinksService : TaskLinksService,
    private featuresService : FeaturesService) { }

  public async getAllForPerson(){
    let x = await this.httpClient.get<ITasks[]>( this.urlsService.GetApiURL()+"Api/Tasks").toPromise();
    if(x)
      for(let i of x){
        i.Selected = false;
      }
    return x;
  }

  public async getAllForPersonWithExtras(){
    let x = await this.httpClient.get<ITasksGroupsViewModel[]>( this.urlsService.GetApiURL()+"Api/Tasks/taskswithextras").toPromise();
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

  public async getAllWithExtrasForPersonTableRecord(tableID : string, recordID : number){
    let x = await this.httpClient.get<ITasksGroupsViewModel[]>( this.urlsService.GetApiURL()+"Api/Tasks/taskswithextras",  { 
      params: 
      {
        
          "tableName" : tableID,
          "entityID" : recordID            
      }
    }).toPromise();
    return x;
  }

  public async getAllFeaturesForProject(projectID : number){
      return await this.featuresService.getAllFeaturesForProjectAndPerson(projectID);
  }
  public async groupTasks(tasks : ITasks[]){
    let taskIDs = tasks.map( x => x.Id);
    let groups = await this.taskLinksService.GetLinks(taskIDs, "GROUPS");
    for (let t of tasks){
      let groupsForTask =  groups?.filter( x => x.TaskID == t.Id);
      t.Groups ??= [];
      groupsForTask ??= [];
      for(let g of groupsForTask)
        t.Groups.push(g.EntityID);
    }

    return tasks;
  }

  public async tasksWithExtras(){
    let x = await this.httpClient.get<ITasksGroupsViewModel[]>( this.urlsService.GetApiURL()+"Api/Tasks/TasksWithExtras").toPromise();
    if(x)
      for(let i of x){
        i.Selected = false;
      }
    return x;
  }
  public async UpdateTask(task : ITasks){
    let x = await this.httpClient.put( this.urlsService.GetApiURL()+"Api/Tasks",  task).toPromise();
    return x;
  }

  public async CreateTask(task : ITasks){
    let x = await this.httpClient.post<number>( this.urlsService.GetApiURL()+"Api/Tasks",  task).toPromise();
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
    Groups : number[] | null;
    Difficulty : number;
    RequiresLearning : number;
    AcceptanceCriteria : string;
    Order : number;
    Estimate : number;
    Impeded : number;
}

export interface ITasksGroupsViewModel
{
    Task : ITasks,
    Groups : IGroup[],
    Sprints : ISprint[],
    Features : IFeature[],
    Selected : boolean
}

export interface IGroup
{
  Id : number,
  PersonId : number,
  Name : string
}
export const COMPLETED = "COMPLETED";
export const IN_REVIEW = "IN_REVIEW";
export const NOT_STARTED = "NOT_STARTED";
export const IN_PROGRESS = "IN_PROGRESS"; 
export const STARTED = "STARTED";  
export const READY = "READY"; 