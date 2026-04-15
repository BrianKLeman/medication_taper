import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { SubTasksEditComponent } from '../sub-tasks-edit/sub-tasks-edit.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISubTask } from '../sub-tasks-edit/sub-tasks.service';

@Component({
  selector: 'app-sub-tasks-form',
  templateUrl: './sub-tasks-form.component.html',
  styleUrls: ['./sub-tasks-form.component.css']
})
export class SubTasksFormComponent implements AfterViewInit {
    public constructor(@Inject(MAT_DIALOG_DATA) 
    private data: TaskData
 ){
  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    if(!this.subTaskEditForm)
      console.error("Task Edit is null");
    else
      console.log("Task Edit is populated");
    this.subTaskEditForm.Init(this.data.subTask, this.data.taskID);
  }
 @ViewChild('subTaskEdit')
 subTaskEditForm!: SubTasksEditComponent;
}

interface TaskData{
      datetime: Date,
      subTask : ISubTask | null,
      taskID : number
}