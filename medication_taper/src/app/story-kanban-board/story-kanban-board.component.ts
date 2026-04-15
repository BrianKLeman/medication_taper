import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { COMPLETED, IN_PROGRESS, IN_REVIEW, ITasksGroupsViewModel, NOT_STARTED, READY, STARTED, TasksService } from '../kanban-board/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { ISprint, SprintsService } from '../sprints.service';
import { TaskLinksService } from '../link-task-to/task-links.service';
import { LinkTaskToComponent } from '../link-task-to/link-task-to.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ISubTask, SubTasksService } from '../sub-tasks-edit/sub-tasks.service';
import { SubTasksFormComponent } from '../sub-tasks-form/sub-tasks-form.component';
import { SprintTaskChartComponent } from '../sprint-task-chart/sprint-task-chart.component';

@Component({
  selector: 'app-story-kanban-board',
  templateUrl: './story-kanban-board.component.html',
  styleUrls: ['./story-kanban-board.component.css']
})
export class StoryKanbanBoardComponent implements AfterViewInit {
  //#region setup
  constructor(private tasksService : TasksService,
              private dialog : MatDialog,
              private sprintsService : SprintsService,
            private subTasksService : SubTasksService,
          private taskLinksService : TaskLinksService){   
  }

  @Input()
  public table : string = "";

  @Input()
  public recordID : number = 0;
  
  @Input()
  public groupIDs : number[] = [];

  @Input()
  public sprintID : number = 0;  

  async ngAfterViewInit() {    
    await this.refreshSprints();
    await this.refresh();
  }


  @ViewChild('taskBurndownChart')
  public chartComponent !: SprintTaskChartComponent;

  public filter(status : string, arg : ITasksGroupsViewModel){    
      return arg.SubTasks.filter( x => x.Status == status);
  }
//#endregion

//#region Initialise

  public async onValueChanged(arg : any){
    await this.refresh();
  }

  public allTasks(){
    if(this.hideComplete)
      return this.Tasks.filter( x => x.Task.Status != COMPLETED)
    return this.Tasks;
  }
  public filterTasks(toFilter : ITasksGroupsViewModel[]) : ITasksGroupsViewModel[]{
    let tasks = toFilter;
     if(this.sprintID > 0){
      tasks = this.filterBySprint(this.sprintID, tasks);
    }

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

    return tasks;
  }
  private async refresh(){
    let tasks = [];
    if(this.table.trim() == ""){
      tasks = await this.tasksService.getAllForPersonWithExtras() ?? [];
    }
    else{
      tasks = await this.tasksService.getAllWithExtrasForPersonTableRecord(this.table, this.recordID) ?? [];
    }
    tasks = tasks.sort( (a, b) => a.Task.Order - b.Task.Order);
   
    tasks = this.filterTasks(tasks);

    const sprint = this.sprints.find( (x : ISprint) => x.Id == this.sprintID);
    if(sprint != null && sprint != undefined)
      this.chartComponent.createBurndownChart(tasks, sprint); 
    this.Tasks = [...tasks];
    
   

  }
  public Tasks : ITasksGroupsViewModel[] = [];

  
  
//#endregion
//#region Sprints
  private async refreshSprints(){
    let results = await this.sprintsService.getAllSprintsForPerson();
    let record : ISprint[]= [];
    if(results){
      results.sort((a, b) => new Date(a.StartDate).valueOf() - new Date(b.StartDate).valueOf());
      for(let x of results){
        record.push(this.ToRecord(x));
      }
    }
    this.sprints = record;
    this.sprintID = this.sprints[this.sprints.length-1].Id;
  }
  
  public ToRecord(record : any) : ISprint{
    let g = record as ISprint;
    if(g.Id != undefined){
      return <ISprint>{ Id : g.Id, Description : `${ g.Name}`, StartDate : g.StartDate, EndDate : g.EndDate};
    }

    return <ISprint>{ Id : -1, Name : "UnNamed", Description : `Unspecified`, StartDate : "", EndDate : "", PersonID : 1};
  }

  sprints : ISprint[] = [];

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

   public hideCompleted(hide : boolean){
    this.hideComplete = hide;
   }

   public hideComplete : boolean = true;
  //#endregion

  //#region Drag&Drop
    async onDropNotStarted(arg : any){
      var t = this.getSubTask();
      if(t){        
        t.Status = NOT_STARTED;
        await this.subTasksService.UpdateSubTask(t);
      }
    }
  
    async onDropInStarted(arg : any){
      var t = this.getSubTask();
      if(t){        
        t.Status = STARTED;
        await this.subTasksService.UpdateSubTask(t);
      }
    }
  
    async onDropInProgress(arg : any){
      var t = this.getSubTask();
      if(t){        
        t.Status = IN_PROGRESS;
        await this.subTasksService.UpdateSubTask(t);
      }
    }
  
    async onDropInReady(arg : any){
      var t = this.getSubTask();
      if(t){        
        t.Status = READY;
        await this.subTasksService.UpdateSubTask(t);
      }
    }
  
    async onDropInReview(arg : any){
      var t = this.getSubTask();
      if(t){        
        t.Status = IN_REVIEW;
        await this.subTasksService.UpdateSubTask(t);
      }
    }
  
    async onDropComplete(arg : any){
      var t = this.getSubTask();
      if(t){        
        t.Status = COMPLETED;
      
        t.DateCompleted = new Date(Date.now()).toISOString();
        await this.subTasksService.UpdateSubTask(t);
      }
    }
  
    allowDrop(arg : any){
      arg.preventDefault();
    }
  
    public completedStatus(){
      return COMPLETED;
    }
    private draggedSubTaskID : number = -1;
    dragStart(taskID : number){
      this.draggedSubTaskID = taskID;
      console.warn(`dragged ${taskID}`);
    }
  
    private getSubTask() {
      let t = this.rem(this.Tasks);
     
      return t;
    }
  
    private rem(items : ITasksGroupsViewModel[]) {
      
      for(let v of items)
        for(let s of v.SubTasks)
          if( s.Id == this.draggedSubTaskID)
              return  s;
      return null;
    }
  //#endregion


  //#region Task Commands
    public addTaskLink(){
      
      let selectedTasksIDs = this.Tasks.filter( x => x.Selected).map( x => x.Task.Id);
      this.addLinksForTasks(selectedTasksIDs);
    }
  
    public addLinksForTasks(selectedTasksIDs : number[]){
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

    public async addSubTask(t:ITasksGroupsViewModel){
      let d = new Date()
      let x = await this.dialog.open(SubTasksFormComponent, { data : 
        {datetime : d, 
          subTask : null, 
          taskID : t.Task.Id
        }}).afterClosed().toPromise();
      
      setTimeout(async () => 
        { 
          await this.refresh(); 
          console.log('returned' + count); 
        }, 
        500);
      let count = await this.refresh();
    }

    public async deleteSubTask(subTask : ISubTask){
      await this.subTasksService.DeleteSubTask(subTask)
      
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
  
    async resetCompletedDate(taskID : number){
      var t = this.Tasks.find( (x) => x.Task.Id == taskID);
      if(t){
        t.Task.DateCompleted = null;
        await this.tasksService.UpdateTask(t.Task);
      }
    }
  
    public async deleteLinksForTasks(selectedTasksIDs : number[], entity_type : string, entity_id : number){
      await this.taskLinksService.DeleteLinks(selectedTasksIDs, entity_type, entity_id);
    }
  //#endregion
  
  //#region Edit SubTask

   public async editSubTask(subTask : ISubTask){
      let d = new Date()
      let x = await this.dialog.open(SubTasksFormComponent, { data : 
        {datetime : d, 
          subTask : subTask,
          taskID : subTask.TaskID
        }}).afterClosed().toPromise();
      
      setTimeout(async () => 
        { 
          await this.refresh(); 
          console.log('returned' + count); 
        }, 
        500);
      let count = await this.refresh();
    }
  //#endregion

  //#region Calculations
  public expectedHoursRemaining() : number{
    return this.Tasks.filter( x => x.Task.Status != COMPLETED)
    .flatMap( X => X.SubTasks)
    .filter( x => x.Status != COMPLETED)
    .map( x => x.ExpectedHours)
    .reduce( (a,b) => a + b,0);
  }

   public expectedHours() : number{
    return this.Tasks
    .flatMap( X => X.SubTasks)    
    .map( x => x.ExpectedHours)
    .reduce( (a,b) => a + b,0);
  }

  public unestimatedSubTasks() : number{
    return this.Tasks
    .flatMap( X => X.SubTasks)    
    .map( x => x.ExpectedHours)
    .reduce( (a,b) => {
      return (a) + (b==0? 1 : 0); 
   } , 0);;
  }

  public storiesCount() : number{
    return this.Tasks.length;
  }

  public subTasksRemaining() : number{
    return this.Tasks
    .flatMap( X => X.SubTasks)    
    .map( (x : ISubTask) : number => { return x.Status != COMPLETED ? 0 : 1;})
    .reduce( (a,b) => {
      return (a) + (b==0? 1 : 0); 
   } , 0);;
  }
  //#endregion
}
