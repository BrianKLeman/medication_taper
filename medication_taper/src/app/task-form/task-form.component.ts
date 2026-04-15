import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { ITasks, TasksService } from '../kanban-board/tasks.service';
import { TimezonesService } from '../timezones.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskLinksService } from '../link-task-to/task-links.service';
import { TaskEditComponent } from '../task-edit/task-edit.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css', './../app.component.css']
})
export class TaskFormComponent implements AfterViewInit {
    public constructor(@Inject(MAT_DIALOG_DATA) 
    private data: TaskData
 ){


  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    if(!this.taskEditForm)
      console.error("Task Edit is null");
    else
      console.log("Task Edit is populated");
    this.taskEditForm.Init(this.data);
  }
 @ViewChild('taskEdit')
 taskEditForm!: TaskEditComponent;


}

interface TaskData{
  
      datetime: Date,
      task : ITasks | null,
      entity : string,
      entity_id : number
      epic_id : 0
}