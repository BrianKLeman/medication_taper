import { Component, Input, OnInit } from '@angular/core';
import { COMPLETED, IN_PROGRESS, IN_REVIEW, ITasks, NOT_STARTED, TasksService } from './tasks.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {

  constructor(private tasksService : TasksService){   

  }

  @Input()
  public table : string = "";

  @Input()
  public recordID : number = 0;
  
  async ngOnInit() {
    if(this.table.trim() == "")
      this.Tasks = await this.tasksService.getAllForPerson() ?? [];
    else      
      this.Tasks = await this.tasksService.getAllForPersonTableRecord(this.table, this.recordID) ?? [];
    this.InProgress = this.Tasks.filter((value : ITasks) => 
    {
      return value.Status == IN_PROGRESS;
    });

    this.NotStarted = this.Tasks.filter((value : ITasks) => 
    {
      return value.Status == NOT_STARTED;
    });

    this.Completed = this.Tasks.filter((value : ITasks) => 
    {
      return value.Status == COMPLETED;
    });

    this.InReview = this.Tasks.filter((value : ITasks) => 
    {
      return value.Status == IN_REVIEW;
    });
  }

  public Tasks : ITasks[] = [];

  public InProgress : ITasks[] = [];
  public NotStarted : ITasks[] = [];
  public InReview : ITasks[] = [];
  public Completed : ITasks[] = [];

  async onDropNotStarted(arg : any){
    var t = this.getTask();
    if(t){
      this.NotStarted.push(t);
      t.Status = NOT_STARTED;
      await this.tasksService.UpdateTask(t);
    }
  }

  async onDropInProgress(arg : any){
    var t = this.getTask();
    if(t){
      this.InProgress.push(t);
      t.Status = IN_PROGRESS;
      await this.tasksService.UpdateTask(t);
    }
  }

  async onDropInReview(arg : any){
    var t = this.getTask();
    if(t){
      this.InReview.push(t);
      t.Status = IN_REVIEW;
      await this.tasksService.UpdateTask(t);
    }
  }

  async onDropComplete(arg : any){
    var t = this.getTask();
    if(t){
      this.Completed.push(t);
      t.Status = COMPLETED;
      await this.tasksService.UpdateTask(t);
    }
  }

  allowDrop(arg : any){
    arg.preventDefault();
  }

  private draggedTaskID : number = -1;
  dragStart(taskID : number){
    this.draggedTaskID = taskID;
  }

  private getTask() : ITasks | undefined{
    let t = this.rem(this.NotStarted);
    if(!t)
      t = this.rem(this.InProgress);
    if(!t)
      t = this.rem(this.InReview);
    if(!t)
      t = this.rem(this.Completed);
    return t;
  }

  private rem(items : ITasks[]) : ITasks | undefined{
    
    let i = - 1;
    let t = items.find( (v : ITasks, index : number) => { if( v.TaskID == this.draggedTaskID) {i = index; return true; } else return false;});    
    if(t)
      items.splice(i,1);

    return t;
  }
}
