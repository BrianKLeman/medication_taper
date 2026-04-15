import { Component, Input } from '@angular/core';
import { COMPLETED, IN_PROGRESS, IN_REVIEW, ITasks, NOT_STARTED, READY, STARTED, TasksService } from '../kanban-board/tasks.service';
import { TimezonesService } from '../timezones.service';
import { TaskLinksService } from '../link-task-to/task-links.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent {
  constructor( private service : TasksService,
  private linksService : TaskLinksService,
  private timeService : TimezonesService){
    this.currentTask = this.CreateNewTask(new Date());
  }
  private epicID : number = 0;
  statusFormControl = new FormControl('');
  public Init( data: 
    {
      datetime: Date,
      task : ITasks | null,
      entity : string,
      entity_id : number,
      epic_id: number
    }){
      this.epicID = data.epic_id;
       if(!data.task){
      let now = new Date(Date.now());
      now = this.timeService.adjustForTimezone(now);
      this.entityID = data.entity_id;
      this.tableName = data.entity;
      this.currentTask = this.CreateNewTask(now);
    } else {
      this.currentTask = data.task;
      this.tableName = data.entity;
      this.entityID = data.entity_id;
      // I need to correct the date time because the server is adjusting it.
      let rd = this.timeService.adjustForTimezone(new Date(this.currentTask.CreatedDate ?? Date.now()))
      this.currentTask.CreatedDate = rd.toISOString();
      this.setDateAndTime(rd);
    }
    this.statusFormControl.setValue(this.currentTask.Status);
  }
 private CreateNewTask(now : Date) : ITasks{
    let ct = now;
    ct.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
    this.setDateAndTime(ct);
    console.log(ct.toISOString());
    let task = this.service.DefaultTask(ct);
    return task;
  }

    public async SaveTask(){
      this.currentTask.Status = this.statusFormControl.value ?? NOT_STARTED;
      this.updateTask(this.currentTask);
      if(this.currentTask?.Id == 0){
        let x = await this.service.CreateTask(this.currentTask);
        if( x && this.entityID != 0 && this.tableName?.length > 0)
          this.linksService.AddLink([x], this.tableName, this.entityID);
        if( x && this.entityID != 0 &&  this.epicID > 0)
          this.linksService.AddLink([x], 'FEATURES', this.epicID);
      }
      else
        await this.service.UpdateTask(this.currentTask);
    }  

  date : string = "";
  time : string = "";

  @Input()
  currentTask !: ITasks;

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

  //#region Extras

  public set RequiresLearning(arg : boolean){
    this.currentTask.RequiresLearning = arg ? 1 : 0;
  }
  public get RequiresLearning(){
    return this.currentTask.RequiresLearning > 0;
  }

  public set Difficulty(arg : number){
    this.currentTask.Difficulty = arg;
  }
  public get Difficulty(){
    return this.currentTask.Difficulty;
  }

  public set Priority(arg : number){
    this.currentTask.Priority = arg;
  }
  public get Priority(){
    return this.currentTask.Priority;
  }

  public set Estimate(arg : number){
    this.currentTask.Estimate = arg;
  }
  public get Estimate(){
    return this.currentTask.Estimate;
  }

   public set Impeded(arg : boolean){
    this.currentTask.Impeded = arg ? 1 : 0;
  }
  public get Impeded(){
    return this.currentTask.Impeded > 0;
  }

    statusOptions = [
      [NOT_STARTED, "Not Started"],
      [READY, "Ready"],
      [STARTED, "Started"],
      [IN_PROGRESS, "In Progress"],
      [IN_REVIEW, "In Review"],
      [COMPLETED, "Completed"]
    ];
  //#endregion

  //#region TaskCommands

  @Input()
  showSaveButton : boolean = false;

  public async save(){
    await this.SaveTask();
  }

  
  //#endregion
}
