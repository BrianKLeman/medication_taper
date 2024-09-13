import { Component, Input, OnInit } from '@angular/core';
import { ITasks, TasksService } from './tasks.service';

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
      return value.Status == "IN_PROGRESS";
    });

    this.NotStarted = this.Tasks.filter((value : ITasks) => 
    {
      return value.Status == "NOT_STARTED";
    });

    this.Completed = this.Tasks.filter((value : ITasks) => 
    {
      return value.Status == "COMPLETED";
    });

    this.InReview = this.Tasks.filter((value : ITasks) => 
    {
      return value.Status == "IN_REVIEW";
    });
  }

  public Tasks : ITasks[] = [];

  public InProgress : ITasks[] = [];
  public NotStarted : ITasks[] = [];
  public InReview : ITasks[] = [];
  public Completed : ITasks[] = [];
}
