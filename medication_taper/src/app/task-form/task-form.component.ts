import { Component, Inject } from '@angular/core';
import { ITasks, TasksService } from '../kanban-board/tasks.service';
import { TimezonesService } from '../timezones.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
    public constructor(@Inject(MAT_DIALOG_DATA) 
    public data: 
    {
      datetime: Date,
      task : ITasks | null,
      entity : string,
      entity_id : number
    },
  private service : TasksService,
  private timeService : TimezonesService){

    if(!data.task){
      let now = new Date(Date.now());
      now = this.timeService.adjustForTimezone(now);
      this.entityID = data.entity_id;
      this.tableName = data.entity;
      this.currentTask = this.CreateNewTask(now);
    } else {
      this.currentTask = data.task;
      // I need to correct the date time because the server is adjusting it.
      let rd = this.timeService.adjustForTimezone(new Date(this.currentTask.CreatedDate ?? Date.now()))
      this.currentTask.CreatedDate = rd.toISOString();
      this.setDateAndTime(rd);
    }

  }

  private CreateNewTask(now : Date) : ITasks{
    let ct = now;
    ct.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
    this.setDateAndTime(ct);
    console.log(ct.toISOString());
    let task = <ITasks> { 
      Id: 0,
      TaskName : "",  
      CreatedDate: ct.toISOString(),  
      CreatedBy: "BKL",  
      PersonID: 0,  
      DueDate: null,  
      Description : "",  
      DateCompleted: null,  
      Priority: 0,  
      Status: "NOT_STARTED"
    };
    return task;
  }

    public SaveTask(){
      this.updateTask(this.currentTask);
      if(this.currentTask?.Id == 0)
        this.service.CreateTask(this.currentTask);
      else
        this.service.UpdateTask(this.currentTask);
    }  

  date : string = "";
  time : string = "";
  currentTask : ITasks;

  public changeDate(d : Date){
  this.date = d.toISOString().split('T')[0];
  }
  option = ""; // used for note type links.

  private setDateAndTime(d : Date){
    this.date = d.toISOString().split("T")[0];
    this.time = d.toISOString().split("T")[1].substring(0,5);
  }

  private updateTask(n : ITasks){
    n.CreatedDate = `${this.date}T${this.time}:00`;
  }

  private entityID = -1;
  private tableName = "";
}