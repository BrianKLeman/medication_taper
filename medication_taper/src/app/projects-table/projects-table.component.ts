import { Component } from '@angular/core';
import { TimezonesService } from '../timezones.service';
import { IProject, ProjectsService } from './projects.service';

@Component({
  selector: 'projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./../app.component.css']
})
export class ProjectsTableComponent {
  constructor(private projectsService : ProjectsService,
    private timeService : TimezonesService,
  ){
  }
  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async showNotes(project : IProject){
    project.ShowNotes = !project.ShowNotes;    
  }
  public adjustForTimezone(date : string | Date | null){
    if(date)
      if(typeof(date) === typeof(" "))
        return this.timeService.adjustForTimezoneStr(date as string);
      else
        return this.timeService.adjustForTimezone(date as Date);

    return "";
  }

  public async refresh(){
      let x = await this.projectsService.getAllProjectsForPerson();
      this.projects = x ?? [];
      console.log("Refreshed Projects "+ x?.length);
      return x?.length ?? 0;
  }

  projects : IProject[] | null = null;
}
