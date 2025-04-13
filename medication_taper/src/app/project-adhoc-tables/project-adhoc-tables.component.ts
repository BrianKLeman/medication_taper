import { Component, Input } from '@angular/core';
import { IProject } from '../projects-table/projects.service';
import { AdhocTablesService, IAdhocTable } from '../adhoc-tables/adhoctables.service';

@Component({
  selector: 'app-project-adhoc-tables',
  templateUrl: './project-adhoc-tables.component.html',
  styleUrls: ['./../app.component.css']
})
export class ProjectAdhocTablesComponent {

  constructor(
    private service : AdhocTablesService
  ){

  }
  @Input()
  public project !: IProject;

  public tableName : string = "";

  public async addTable(){
    let table = await this.service.createTable(this.project.Id, this.tableName);
    this.project.AdhocTables.push(table as IAdhocTable);
  }

  public async deleteTable(tableID : number){
    let result = await this.service.deleteTable(tableID);
    if(result == 0){
      let index = this.project.AdhocTables.findIndex( x => x.Id == tableID);
      this.project.AdhocTables.splice(index,1);
    }

  }
}
