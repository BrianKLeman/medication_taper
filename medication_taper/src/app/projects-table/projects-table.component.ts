import { Component } from '@angular/core';
import { TimezonesService } from '../timezones.service';
import { IProject, ProjectsService } from './projects.service';
import { AdhocTablesService, IAdhocTable } from '../adhoc-tables/adhoctables.service';

@Component({
  selector: 'projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./../app.component.css']
})
export class ProjectsTableComponent {
  constructor(private projectsService : ProjectsService,
    private adhocTablesService : AdhocTablesService,
    private timeService : TimezonesService,
  ){
  }
  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async showNotes(project : IProject){
    project.ShowNotes = !project.ShowNotes;    
  }
  

  public async refresh(){
      let x = await this.projectsService.getAllProjectsForPerson();
      this.projects = x ?? [];
      console.log("Refreshed Projects "+ x?.length);
      this.beatcharts = (await this.adhocTablesService.getAllAdhocTablesForPerson()) ?? [];
      for(let p of this.projects){
        p.AdhocTables = this.beatcharts.filter( x => { return x.ProjectID == p.Id});
        console.log(JSON.stringify(p));
      }
      console.log(JSON.stringify(this.beatcharts));
      return x?.length ?? 0;
  }

  projects : IProject[] | null = null;

  async showTasks(project : IProject){
    project.ShowTasks = !project.ShowTasks;    
  }

  public HasBeatcharts(project : IProject){
    for(let b of this.beatcharts){
      if(b.ProjectID == project.Id)
        return true;
    }
    return false;
  }

  private beatcharts : IAdhocTable[] = []; 

  async showBeatcharts(project : IProject){
    project.ShowAdhocTables = !project.ShowAdhocTables;    
  }
}
