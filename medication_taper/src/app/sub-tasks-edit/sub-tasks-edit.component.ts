import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { COMPLETED, IN_PROGRESS, IN_REVIEW, NOT_STARTED, READY, STARTED } from '../kanban-board/tasks.service';
import { ISubTask, SubTasksService } from './sub-tasks.service';

@Component({
    selector: 'app-sub-tasks-edit',
    templateUrl: './sub-tasks-edit.component.html',
    styleUrls: ['./sub-tasks-edit.component.css'],
    standalone: false
})
export class SubTasksEditComponent {

  constructor(private subTasksService : SubTasksService){

  }
  subTaskForm = new FormGroup({
  name : new FormControl(''),
  details : new FormControl(''),
  createdDate : new FormControl(new Date()),
  status : new FormControl(''),
  minHours : new FormControl(0),
  maxHours : new FormControl(0),
  actualHours : new FormControl(0),
  expectedHours : new FormControl(0)
  });
  
  subTaskID : number = 0;
  public async onSubmit(){
    let v = this.subTaskForm.value;
    this.subTask.Id = this.subTaskID;
    this.subTask.Name = v.name ?? "";
    this.subTask.Details = v.details ?? "";
    this.subTask.Status = v.status ?? NOT_STARTED;
    this.subTask.MinHours = v.minHours ?? 0;
    this.subTask.MaxHours = v.maxHours ?? 0;
    this.subTask.ExpectedHours = v.expectedHours ?? 0;
    this.subTask.ActualHours = v.actualHours ?? 0;
    this.subTask.DateCompleted = null;
    let result : number | undefined = -1;
    if(this.subTask.Id < 1)
      result = await this.subTasksService.CreateSubTask(this.subTask);
    else
      result = await this.subTasksService.UpdateSubTask(this.subTask);
    console.warn(`UpdateSubTask returned ${result}`);
  }
  
  public Init(subTask : ISubTask | null, taskID : number){
    this.subTask = subTask ?? this.newSubTask(taskID);
    this.subTask.TaskID = taskID;
    this.subTaskID = this.subTask.Id;
    this.SyncForm();
  }
  private subTask !: ISubTask;

  private newSubTask(taskID : number){
    return {
       Name : "Untitled",
       Details : "",
       Id : 0,
       Status : NOT_STARTED,
       PersonId : 0,
       TaskID : taskID,
       CreatedDate : new Date(Date.now()),
       MinHours : 0, MaxHours : 0, ActualHours : 0, ExpectedHours : 0,
       DateCompleted : ""
      }
  }
  private SyncForm(){
    this.subTaskForm.setValue( 
      { 
        name: this.subTask.Name, 
        details: this.subTask.Details,
        createdDate: new Date(this.subTask.CreatedDate),
        status : this.subTask.Status,
        minHours : this.subTask.MinHours,
        maxHours : this.subTask.MaxHours,
        actualHours : this.subTask.ActualHours,
        expectedHours : this.subTask.ExpectedHours
      });
  }

  statusOptions = [
    [NOT_STARTED, "Not Started"],
    [READY, "Ready"],
    [STARTED, "Started"],
    [IN_PROGRESS, "In Progress"],
    [IN_REVIEW, "In Review"],
    [COMPLETED, "Completed"]
  ];

  @Input()
  inDialog = true;
}
