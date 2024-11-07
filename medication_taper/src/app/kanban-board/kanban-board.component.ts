import { Component, Input, OnInit } from '@angular/core';
import { COMPLETED, IN_PROGRESS, IN_REVIEW, ITasks, NOT_STARTED, STARTED, TasksService } from './tasks.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { LinkTaskToComponent } from '../link-task-to/link-task-to.component';
import { IGroups } from '../groups.service';
import { TaskLinksService } from '../link-task-to/task-links.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {

  //#region setup
  constructor(private tasksService : TasksService,
              private recordsService :  TaskLinksService,
              private dialog : MatDialog){   
  }

  @Input()
  public table : string = "";

  @Input()
  public recordID : number = 0;
  
  @Input()
  public groupID : number = 0;

  
  async ngOnInit() {
    await this.refresh();
    this.refreshGroups();
  }
//#endregion

//#region Initialise

  public async onValueChanged(arg : any){
    await this.refresh();
  }
  private async refresh(){
    let tasks = [];
    if(this.table.trim() == "")
      this.Tasks = tasks = await this.tasksService.getAllForPerson() ?? [];
    else      
      this.Tasks = tasks = await this.tasksService.getAllForPersonTableRecord(this.table, this.recordID) ?? [];

    if(this.groupID > 0){
      tasks = await this.tasksService.groupTasks(tasks);
      console.log(tasks.length + " - group " + this.groupID);
      let group = this.groupID;
      let filtered = tasks;
      console.log
      tasks = [];
      for( let f of filtered)
        if(f.Groups)
        for(let g of f.Groups)
          if(g == group){
            tasks.push(f);
            console.log("push");
          }
      console.log( " TasksLength includes " + tasks.length)
    }

    this.InProgress.length = 0;
    this.InProgress.push(...tasks.filter((value : ITasks) => 
    {
      return value.Status == IN_PROGRESS;
    }));

    this.Started.length = 0;
    this.Started.push(...tasks.filter((value : ITasks) => 
      {
        return value.Status == STARTED;
      }));

    this.NotStarted.length = 0;
    
    this.NotStarted.push(...tasks.filter((value : ITasks) => 
    {
      return value.Status == NOT_STARTED;
    }));
    console.log(this.NotStarted.length);

    this.Completed.length = 0;
    this.Completed.push(...tasks.filter((value : ITasks) => 
    {
      return value.Status == COMPLETED;
    }));

    this.InReview.length = 0;
    this.InReview.push(...tasks.filter((value : ITasks) => 
    {
      return value.Status == IN_REVIEW;
    }));
  }
  public Tasks : ITasks[] = [];

  
  public Started : ITasks[] = [];
  public InProgress : ITasks[] = [];
  public NotStarted : ITasks[] = [];
  public InReview : ITasks[] = [];
  public Completed : ITasks[] = [];
//#endregion
  //#region Drag&Drop
  async onDropNotStarted(arg : any){
    var t = this.getTask();
    if(t){
      this.NotStarted.push(t);
      t.Status = NOT_STARTED;
      await this.tasksService.UpdateTask(t);
    }
  }

  async onDropInStarted(arg : any){
    var t = this.getTask();
    if(t){
      this.Started.push(t);
      t.Status = STARTED;
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
      t = this.rem(this.Started);
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
    let t = items.find( (v : ITasks, index : number) => { if( v.Id == this.draggedTaskID) {i = index; return true; } else return false;});    
    if(t)
      items.splice(i,1);

    return t;
  }
//#endregion

//#region Task Commands
  public async addTaskLink(){
    
    let selectedTasksIDs = this.Tasks.filter( x => x.Selected).map( x => x.Id);
    let x = await this.dialog.open(LinkTaskToComponent, { data : 
      {
        taskIDs : selectedTasksIDs, 
      }}).afterClosed().toPromise();
    
    setTimeout(async () => 
      { 
        await this.refresh(); 
        console.log('returned' + count); 
      }, 
      500);
    let count = await this.refresh();
  }

  public async addTask(){
    let d = new Date()
    let x = await this.dialog.open(TaskFormComponent, { data : 
      {datetime : d, 
        entity : this.table, 
        entity_id : this.recordID
      }}).afterClosed().toPromise();
    
    setTimeout(async () => 
      { 
        await this.refresh(); 
        console.log('returned' + count); 
      }, 
      500);
    let count = await this.refresh();
  }

  public async editTask(t : ITasks){
    let d = new Date()
    let x = await this.dialog.open(TaskFormComponent, { data : 
      {datetime : d, 
        entity : this.table, 
        entity_id : this.recordID,
        task : t
      }}).afterClosed().toPromise();
    
    setTimeout(async () => 
      { 
        await this.refresh(); 
        console.log('returned' + count); 
      }, 
      500);
    let count = await this.refresh();
  }

  public async deleteTasks(){    
    let selectedTasks = this.Tasks.filter( x => x.Selected);
    for( let t of selectedTasks)
      await this.tasksService.DeleteTask(t);
    setTimeout(async () => 
      { 
        await this.refresh(); 
        console.log('returned' + count); 
      }, 
      500);
    let count = await this.refresh();
  }
//#endregion

  //#region Record Type
  private refreshGroups(){
    this.recordsService.getRecords("GROUPS").then( 
      (results) => 
        {
          let record = [];
          if(results){
            for(let x of results){
              record.push(this.ToRecord(x));
            }
          }
          this.records = record;
    });
  }
  
  public ToRecord(record : any) : {id : number, desc : string}{
    let g = record as IGroups;
    if(g.Id != undefined){
      return { id : g.Id, desc : `${ g.Name}`};
    }

    return { id : -1, desc : `Unspecified`};
  }

  records : {id : number, desc : string}[] = [];

  //#endregion
}
