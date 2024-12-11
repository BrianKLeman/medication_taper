import { Component, Input, OnInit } from '@angular/core';
import { COMPLETED, IN_PROGRESS, IN_REVIEW, ITasks, ITasksGroupsViewModel, NOT_STARTED, STARTED, TasksService } from './tasks.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { LinkTaskToComponent } from '../link-task-to/link-task-to.component';
import { GroupsService, IGroups } from '../groups.service';
import { TaskLinksService } from '../link-task-to/task-links.service';
import { IGroupsSelectionVM } from '../groups/groups.component';
import { ISprint, SprintsService } from '../sprints.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {

  //#region setup
  constructor(private tasksService : TasksService,
              private dialog : MatDialog,
             private groupsService : GroupsService,
              private sprintsService : SprintsService){   
  }

  @Input()
  public table : string = "";

  @Input()
  public recordID : number = 0;
  
  @Input()
  public groupIDs : number[] = [];

  @Input()
  public sprintID : number = 0;
  async ngOnInit() {
    let groups = await this.groupsService.getAllGroupsForPerson();
    await this.refresh();
    this.refreshSprints();
  }
//#endregion

//#region Initialise

  public async onValueChanged(arg : any){
    await this.refresh();
  }
  private async refresh(){
    let tasks = [];
    if(this.table.trim() == "")
      this.Tasks = tasks = await this.tasksService.getAllForPersonWithExtras() ?? [];
    else      
      this.Tasks = tasks = await this.tasksService.getAllWithExtrasForPersonTableRecord(this.table, this.recordID) ?? [];
 
    if(this.sprintID > 0)
      tasks = this.filterBySprint(this.sprintID, tasks);

    if(this.sprintID == -2) // Uncommitted Backlog
    {
      tasks = this.filterByUncommitted(tasks);
    }
    if(this.groupIDs.length > 0){
      console.log(tasks.length + " - group " + this.groupIDs);
      let group = this.groupIDs;
      let filtered = tasks;
      console.log
      tasks = [];
      for( let f of filtered)
        if(f.Groups)
          for(let g of f.Groups)
            if(group.indexOf(g.Id) > -1)
              tasks.push(f);
    }

    this.InProgress.length = 0;
    this.InProgress.push(...tasks.filter((value : ITasksGroupsViewModel) => 
    {
      return value.Task.Status == IN_PROGRESS;
    }));

    this.Started.length = 0;
    this.Started.push(...tasks.filter((value : ITasksGroupsViewModel) => 
      {
        return value.Task.Status == STARTED;
      }));

    this.NotStarted.length = 0;
    
    this.NotStarted.push(...tasks.filter((value : ITasksGroupsViewModel) => 
    {
      return value.Task.Status == NOT_STARTED;
    }));
    console.log(this.NotStarted.length);

    this.Completed.length = 0;
    this.Completed.push(...tasks.filter((value : ITasksGroupsViewModel) => 
    {
      return value.Task.Status == COMPLETED;
    }));

    this.InReview.length = 0;
    this.InReview.push(...tasks.filter((value : ITasksGroupsViewModel) => 
    {
      return value.Task.Status == IN_REVIEW;
    }));
  }
  public Tasks : ITasksGroupsViewModel[] = [];

  
  public Started : ITasksGroupsViewModel[] = [];
  public InProgress : ITasksGroupsViewModel[] = [];
  public NotStarted : ITasksGroupsViewModel[] = [];
  public InReview : ITasksGroupsViewModel[] = [];
  public Completed : ITasksGroupsViewModel[] = [];
//#endregion
  //#region Drag&Drop
  async onDropNotStarted(arg : any){
    var t = this.getTask();
    if(t){
      this.NotStarted.push(t);
      t.Task.Status = NOT_STARTED;
      await this.tasksService.UpdateTask(t.Task);
    }
  }

  async onDropInStarted(arg : any){
    var t = this.getTask();
    if(t){
      this.Started.push(t);
      t.Task.Status = STARTED;
      await this.tasksService.UpdateTask(t.Task);
    }
  }

  async onDropInProgress(arg : any){
    var t = this.getTask();
    if(t){
      this.InProgress.push(t);
      t.Task.Status = IN_PROGRESS;
      await this.tasksService.UpdateTask(t.Task);
    }
  }

  async onDropInReview(arg : any){
    var t = this.getTask();
    if(t){
      this.InReview.push(t);
      t.Task.Status = IN_REVIEW;
      await this.tasksService.UpdateTask(t.Task);
    }
  }

  async onDropComplete(arg : any){
    var t = this.getTask();
    if(t){
      this.Completed.push(t);
      t.Task.Status = COMPLETED;
      await this.tasksService.UpdateTask(t.Task);
    }
  }

  allowDrop(arg : any){
    arg.preventDefault();
  }

  private draggedTaskID : number = -1;
  dragStart(taskID : number){
    this.draggedTaskID = taskID;
  }

  private getTask() : ITasksGroupsViewModel | undefined{
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

  private rem(items : ITasksGroupsViewModel[]) : ITasksGroupsViewModel | undefined{
    
    let i = - 1;
    let t = items.find( (v : ITasksGroupsViewModel, index : number) => { if( v.Task.Id == this.draggedTaskID) {i = index; return true; } else return false;});    
    if(t)
      items.splice(i,1);

    return t;
  }
//#endregion

//#region Task Commands
  public addTaskLink(){
    
    let selectedTasksIDs = this.Tasks.filter( x => x.Selected).map( x => x.Task.Id);
    this.dialog.open(LinkTaskToComponent, { data : 
      {
        taskIDs : selectedTasksIDs, 
      }}).afterClosed().toPromise().then(() =>
      {        
      setTimeout(async () => 
      { 
        await this.refresh(); 
      }, 
      500);
      });
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

  public async editTask(t : ITasksGroupsViewModel){
    let d = new Date()
    let x = await this.dialog.open(TaskFormComponent, { data : 
      {datetime : d, 
        entity : this.table, 
        entity_id : this.recordID,
        task : t.Task
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
      await this.tasksService.DeleteTask(t.Task);
    setTimeout(async () => 
      { 
        await this.refresh(); 
        console.log('returned' + count); 
      }, 
      500);
    let count = await this.refresh();
  }
//#endregion

  //#region Sprints
  private refreshSprints(){
    this.sprintsService.getAllSprintsForPerson().then( 
      (results) => 
        {
          let record = [];
          if(results){
            for(let x of results){
              record.push(this.ToRecord(x));
            }
          }
          this.sprints = record;
    });
  }
  
  public ToRecord(record : any) : {id : number, desc : string}{
    let g = record as ISprint;
    if(g.Id != undefined){
      return { id : g.Id, desc : `${ g.Name}`};
    }

    return { id : -1, desc : `Unspecified`};
  }

  sprints : {id : number, desc : string}[] = [];

  private filterBySprint(sprintID : number, tasks : ITasksGroupsViewModel[]){
   let ts = tasks.filter( tVM => {
    for(let s of tVM.Sprints)
      if(s.Id == sprintID)
        return true;

    return false;
   });
   return ts;
  }

  private filterByUncommitted( tasks : ITasksGroupsViewModel[]){
    let ts = tasks.filter( tVM => {
      return tVM.Sprints.length == 0;
    });
    return ts;
   }
  //#endregion

  //#region Groups
  public async groupsChanged(groups : IGroupsSelectionVM[]){
    this.groupIDs = [];
    for(let g of groups)
      if(g.isSelected){
        this.groupIDs.push(g.group.Id);
        console.log(this.groupIDs);
      }

    await this.refresh();

  }
  //#endregion
}
